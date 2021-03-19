const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Server Routes
export const AUTH_API_URL = "/api/auth";
export const POST_API_URL = "/api/post"

export const SERVER_ADDRESS = process.env.SERVER_ADDRESS;