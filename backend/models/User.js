const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlegth: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlegth: 50
    },
    lastname: {
        type: String,
        maxlegth: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});


userSchema.pre('save', next => {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return next(arr)
            };
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                };
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    };
});


const User = mongoose.model('User', userSchema);

module.exports = { User };