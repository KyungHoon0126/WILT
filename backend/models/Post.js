const mongoose = require('mongoose');
const ECategory = require('../Enums/ECategory');
const autoIncrement = require('mongoose-auto-increment');
const { User } = require('../models/User');
const stringValidation = require('../lib/validation');

autoIncrement.initialize(mongoose.connection);

const postSchema = mongoose.Schema({
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
    thumbnail: String,
    viewcnt: Number,
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

postSchema.pre('save', function(next) {
    let post = this;
    this.updatedAt = Date.now();

    // 내용 크기, 자리수, 유효성 검사 등등 하면 될듯.
    if (!stringValidation.isEmpty(post.title)) {
        next();
    } else {
        next();
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };