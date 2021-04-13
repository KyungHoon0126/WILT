require('colors');
const { User } = require('../../models/User')

exports.signUp = (req, res) => {
    const user = new User(req.body);
    
    user.save((err, userInfo) => {
        if (err) {
            console.log("SIGN UP 400".red);

            return res.json({
                message: "회원가입에 실패하였습니다.",
                err
            });
        }
        
        console.log("SIGN UP 200".green);
        return res.status(200).json({ 
            status: 200,
            message: "회원가입이 완료되었습니다."
        });
    });  
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            console.log("LOGIN 400".red);
            return res.json({
                loginSuccess: false,
                mesage: "해당 이메일에 해당하는 유저가 없습니다."
            });
        };

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                console.log("LOGIN COMPARE PASSWORD 400".red);
                return res.json({ 
                    loginSuccess: false, 
                    message: "비밀번호가 틀렸습니다." 
                });
            };   

            user.generateToken((err, user) => {
                if (err) {
                    console.log("LOGIN GENERATE TOKEN 400".red);
                    console.log(err);
                    return res.status(400).send(err);
                }

                console.log(`LOGIN 200`.green + " " + req.body.email);

                res.cookie("token", user.token)
                   .status(200)
                   .json({
                       message: "로그인 성공",
                       data: {
                           "token" : user.token,
                           "user" : {
                                name: user.name,
                                email: user.email,
                           }
                       },
                       loginSuccess: true,
                       // userId: user._id
                   });
            });
        });
    });
};

exports.auth = (req, res) => {
    res.status(200).json({
        _id: req.userId,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
};

exports.logout = (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) {
            console.log("LOGOUT 400".red);
            return res.json({
                message: "로그아웃 실패",
                err
            });
        }

        console.log("LOGOUT 200".green + " " + req.user.email);
        return res.json({ 
            message: "로그아웃 성공"
        });
    });
};