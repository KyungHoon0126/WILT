const mongoose = require('mongoose');
const ECategory = require('../Enums/ECategory');
const autoIncrement = require('mongoose-auto-increment');
const { User } = require('../models/User');
const { defaultThumbnail } = require('../config');

autoIncrement.initialize(mongoose.connection);

const postSchema = new mongoose.Schema({
    postIdx: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        maxlength: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    writer: {
        type: String
    },
    thumbnail: {
        type: String,
        default: defaultThumbnail
    },
    viewcnt: Number,
    like: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum : ECategory,
        default: ECategory.DAILY
    },
});

// idx AutoIncrement
postSchema.plugin(autoIncrement.plugin, {
    model: 'post',
    field: 'postIdx',
    startAt: 1,
    increment: 1
});

postSchema.pre('save', function(next, token) {
    let post = this;
    this.updatedAt = Date.now();

    const user = User.getUser(token['token'], (err, user) => {
        if (err) {
            return next(err);
        }

        post.writer = user.name;
        next();
    });
});


postSchema.statics.getPost = function(token, cb) {
    let post = this;

    post.findOne({ "postIdx" : postIdx }, (err, post) => {
        if (err) {
            return cb(err);
        }
        cb(null, post);
    });
};

const aggregatePainate = require('mongoose-aggregate-paginate-v2');

postSchema.plugin(aggregatePainate);

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };