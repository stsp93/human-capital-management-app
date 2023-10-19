const { Schema, model, Types } = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter Username'],
        minLength: [3, 'Username should be at least 3 characters long'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        minLength: [3, 'Password should be at least 3 characters long']
    },
    employeeId: {
        type: Types.ObjectId,
        ref: 'Employee'
    },
    role: {
        type: String,
        enum: { values: ['user', 'hr', 'admin'], message: 'Role should be user, hr or admin' },
        default: 'user',
    }
});

// Hashing password before saving in the DB
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
    }
})

const User = model('User', userSchema);

module.exports = User;