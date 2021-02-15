const config = require('../config')

if (config.NODE_ENV === 'production') { 
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}