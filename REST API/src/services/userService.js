const Service = require('./Service');
const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const { promisify } = require('util');
const CustomError = require('../utilities/CustomError');

const tokenBlacklist = new Set();
const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify(jwt.verify);

class UserService extends Service {
  constructor() {
    super(User);
  }

  async register(user) {
    user.role = 'user';
    
    const newUser = await this.model.create(user);
    // Create blank employee linked with the user
    const newEmployee = await Employee.create({name:'New employee '+ user.username});
    newUser.employeeId = newEmployee._id;
    await newUser.save();

    const payload = {
      username: newUser.username,
      role: newUser.role,
      employeeId: newUser.employeeId,
      _id: newUser._id,
    };

    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '1d' });

    return {
      username: newUser.username,
      _id: newUser._id,
      role: newUser.role,
      employeeId: newUser.employeeId,
      token,
    };
  }

  async login(user) {
    const existing = await this.model
      .findOne({ username: user.username })
      .collation({ locale: 'en' });
    if (!existing || !(await bcrypt.compare(user.password, existing.password))) {
      throw new Error('Username or Password are incorrect');
    }

    const payload = {
      username: existing.username,
      role: existing.role,
      employeeId: existing.employeeId,
      _id: existing._id,
    };

    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '1d' });

    return {
      username: existing.username,
      _id: existing._id,
      role: existing.role,
      employeeId: existing.employeeId,
      token,
    };
  }

  logout(token) {
    tokenBlacklist.add(token);
  }

  async verifyToken(token) {
    if (tokenBlacklist.has(token)) {
      throw new Error('Token is blacklisted');
    }

    return await jwtVerifyAsync(token, JWT_SECRET);
  }

  async deleteById(id, userId) {
    // Prevent admin self delete
    if(userId === id) throw new CustomError("Forbidden self delete", 403);

    return await this.model.deleteOne({ _id: id });
  }

  async getById(id, user) {
    if(user.role === 'user' && user._id !== id) throw new CustomError('Unauthorized access', 401);
    const result = await this.model.findById(id);
    return result || {};
  }

  async getAll(query) {
    const queryObj = this.formatQuery(query)
    
    queryObj.filters.username = { $regex: new RegExp(queryObj.search, 'i') }

    return await this.querySearch(queryObj);
  }
}

module.exports = new UserService();