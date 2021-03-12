const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const path = require('path');
const { debug } = require('console');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 80
    },
    lastname: {
        type: String,
        maxlength: 50
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

userSchema.pre('save', function(next) {
    let user = this;
    
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) {
                return next(err);
            };

            bcrypt.hash(user.password, salt, function(err, hash){ 
                if (err) {
                    return next(err);
                };
                user.password = hash;
                next();
            });
        });   
    } else {
        next();
    } 
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) {
            console.log(err);
            return cb(err);
        };
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    let user = this;
    // Math.floor(Date.now() / 1000) + 60
    let token = jwt.sign({ _id: user._id.toHexString(), exp: 999999999999999999999 }, process.env.SECRET_KEY);
        
    // token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);
    
    user.token = token;
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            return cb(err);
        }
        cb(null, user);
    });
};

userSchema.statics.getUser = function(token, cb) {
    let user = this;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            cb(err, null);
        };
        
        user.findOne({"_id" : decoded, "token": token}, (err, user) => {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };