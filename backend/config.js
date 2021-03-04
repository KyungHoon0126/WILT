const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoURI = process.env.MONGO_URI;

const port = process.env.PORT;

const enviroment = process.env.NODE_ENV;
console.log(`NODE ENVIROMENT : ${enviroment}`);

module.exports = {
    mongoURI,
    port,
    enviroment
}
