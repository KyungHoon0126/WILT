const colors = require('colors');
const { User } = require('../../models/User');
const { Post } = require('../../models/Post');
const stringValidation = require('../../lib/validation');

exports.post = (req, res) => {
    const post = new Post(req.body);

    post.save({ token: req.headers.token }, (err, postInfo) => {
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
};

exports.deletePost = (req, res) => {
    Post.findOne({ postIdx: req.query.postIdx }, (err, post) => {
        if (!post) {
            console.log("DELETE POST 400".red);
            return res.json({
                message: "검증 오류"
            });
        };

        post.delete((err, postInfo) => {
            if (err) {
                return res.status(400).json({
                    message: "삭제 실패"
                });
            };

            console.log("DELETE POST 200".green);
            return res.status(200).json({
                message: "삭제 성공"
            })
        });
    });
};