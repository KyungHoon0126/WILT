const config = require('../../config');

require('../../config');

exports.createUrl = (fileName) => {
    return `${config.serverAddress}:${config.port}/public/${fileName}`;
};