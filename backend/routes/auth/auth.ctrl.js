const { User } = require('../../models/User')

exports.signUp = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save((err, userInfo) => {
            return res.status(200).json({ 
                status: 200,
                message: '회원가입이 완료되었습니다.'
            })
        });  
    } catch (err) {
        console.log(err.message)
        return res.json({ 
            status: 500,
            message: '회원가입에 실패하였습니다.'
        });
    }
};