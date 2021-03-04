const { User } = require('../../models/User')

exports.signUp = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save((err, userInfo) => {
            return res.status(200).json({ 
                status: 200,
                message: "회원가입이 완료되었습니다."
            })
        });  
    } catch (err) {
        console.log(err.message)
        return res.json({ 
            status: 500,
            message: "회원가입에 실패하였습니다."
        });
    }
};

exports.login = async (req, res) => {
    try {
         await User.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {
                return res.json({
                    message: "해당 이메일에 해당하는 유저가 없습니다.", 
                });
            }
    
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        message: "비밀번호가 일치하지 않습니다."
                    });
                }
            });
    
            user.generateToken((err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }

                res.cookie("token", user.token)
                   .status(200)
                   .json({
                        message: "로그인 성공"
                   });
            });
        });
    } catch (err) {
        console.log(err.message);
        return res.json({
            status: 500,
            message: "로그인 실패"
        });
    }
};