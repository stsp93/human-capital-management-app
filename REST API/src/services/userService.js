const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const { promisify } = require('util');

// Promisifying JWT
const jwtSignAsync = promisify(jwt.sign)
const jwtVerifyAsync = promisify(jwt.verify)

const tokenBlacklist = new Set();

async function register(user) {
    const newUser = await User.create(user)

    // sign jwt
    const payload = {
        username: newUser.username,
        role: newUser.role,
        _id: newUser._id,
    }
    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '1d' });

    // return user with token
    return {
        username: newUser.username,
        _id: newUser._id,
        role: newUser.role,
        token
    }
}

async function login(user) {
    // find user 
    const existing = await User.findOne({ username: user.username }).collation({ locale: 'en' });

    // check username/password
    if (!existing || !await bcrypt.compare(user.password, existing.password)) throw new Error('Username or Password are incorrect')

    // sign jwt
    const payload = {
        username: existing.username,
        role: existing.role,
        _id: existing._id,
    }
    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '2d' });

    // return user with token
    return {
        username: existing.username,
        _id: existing._id,
        role: existing.role,
        token
    }

}

function logout(token) {
    tokenBlacklist.add(token);
}

async function verifyToken(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted')
    }

    return await jwtVerifyAsync(token, JWT_SECRET);
}



module.exports = {
    register,
    login,
    logout,
    verifyToken,
}