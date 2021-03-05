const { User } = require('../models/User');

let auth = (req, res, next) => {
    let token = req.cookies.token;

    User.getUser(token, (err, user) => {
        if (err) {
            switch (err.message) {
                case 'jwt must be provided':
                case 'TOKEN_IS_ARRAY':
                case 'NO_TOKEN':
                case 'INVALID_TOKEN':
                case 'NO_USER':
                    return res.status(401).json({ 
                        message: "유효하지 않은 토큰",
                        isAuth: false
                    });
                case 'EXPIRED_TOKEN':
                    return res.status(410).json({ 
                        message: "토큰 만료",
                        isAuth: false
                    });
                default:
                    return res.status(500).json({ 
                        message: "서버 오류",
                        isAuth: false 
                    });
            }
        }

        /* if (!user) {
            console.log(`Token : ${token}`);
            console.log("Auth : User does not exist.");
            return res.json({
                isAuth: false,
                error: true
            });
        } */

        if (user) {
            req.token = token;
            req.user = user;
            next();
        }
    });
};

module.exports = { auth };