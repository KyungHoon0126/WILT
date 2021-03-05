const colors = require('colors');
const { User } = require('../../models/User');
const { Post } = require('../../models/Post');

exports.post = (req, res) => {
    const user = User.getUser(req.headers.token, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: "검증 오류"
            });
        }

        if (user) {
            const post = new Post(req.body);

            post.save((err, postInfo) => {
                if (err) {
                    console.log("POST 400".red);
                    return res.json({
                        message: "생성 실패",
                        err
                    });
                };
            });

            console.log("POST 200".green);
            return res.status(200).json({
                status: 200,
                message: "생성 성공"
            });
        }
    });
};