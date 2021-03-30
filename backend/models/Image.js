const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: {
        data: Buffer,
        contentType: String
    },
    url: String
});

const Image = mongoose.model('Image', imageSchema);

module.exports = { Image };