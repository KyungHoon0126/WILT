const { User } = require('../models/User');

let auth = (req, res, next) => {
    let token = req.cookies.token;

    User.findByToken(token, (err, user) => {
        if (err) {
            throw err;
        }

        if(!user) {
            console.log(token);
            console.log("Auth : User does not exist.");
            return res.json({
                isAuth: false,
                error: true
            });
        }

        req.token = toekn;
        req.user = user;
        next();
    });
};

module.exports = { auth };