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


userSchema.pre('save', (next) => {
    let user = this;
    
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) {
                return next(err);
            };

            bcrypt.hash(user.password, salt, function(err, hash){ // hash : 암호화된 비밀번호
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

userSchema.methods.comparePassword = (plainPassword, cb) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) {
            console.log(err);
            return cb(err);
        };
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = (cb) => {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if (err) {
            console.log(err);
            return cb(err);
        }
        cb(null, user);
    });
};

userSchema.statics.findByToken = (token, cb) => {
    let user = this;

    jwt.verify(token, 'secret', (err, decoded) => {
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