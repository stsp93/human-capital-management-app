const Service = require('./Service');
const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const { promisify } = require('util');

const tokenBlacklist = new Set();
const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify(jwt.verify);

class UserService extends Service {
  constructor() {
    super(User);
  }

  async create(user) {
    const newEmployee = await Employee.create({});
    user.employee_id = newEmployee._id;
    const newUser = await this.model.create(user);

    const payload = {
      username: newUser.username,
      role: newUser.role,
      employee_id: newUser.employee_id,
      _id: newUser._id,
    };

    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '1d' });

    return {
      username: newUser.username,
      _id: newUser._id,
      role: newUser.role,
      employee_id: newUser.employee_id,
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
      employee_id: existing.employee_id,
      _id: existing._id,
    };

    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '1d' });

    return {
      username: existing.username,
      _id: existing._id,
      role: existing.role,
      employee_id: existing.employee_id,
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
}

module.exports = new UserService();