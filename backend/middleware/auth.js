const { User } = require('../models/User');

let auth = (req, res, next) => {
    // let token = req.cookies.token;
    let token = req.headers.token;

    User.getUser(token, (err, user) => {
        if (err) {
            switch (err.message) {
                case 'jwt must be provided':
                    return res.json({
                        message: "토큰 미전송",
                        isAuth: false
                    });
                case 'TOKEN_IS_ARRAY':
                case 'NO_TOKEN':
                case 'INVALID_TOKEN':
                case 'NO_USER':
                case 'Unauthorized':
                case 'jwt malformed':
                    return res.json({ 
                        message: "유효하지 않은 토큰",
                        isAuth: false
                    });
                case 'jwt expired':
                    return res.json({ 
                        message: "토큰 만료",
                        isAuth: false
                    });
                default:
                    return res.json({ 
                        message: "서버 오류",
                        isAuth: false 
                    });
            }
        }

        // if (!user) {
        //     console.log(`Token : ${token}`);
        //     console.log("Auth : User does not exist.");
        //     return res.json({
        //         isAuth: false,
        //         error: true
        //     });
        // }

        if (user) {
            req.token = token;
            req.user = user;
            next();
        }
    });
};

module.exports = { auth };