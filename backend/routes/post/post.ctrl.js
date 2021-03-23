require('colors');
const { User } = require('../../models/User');
const { Post } = require('../../models/Post');

exports.createPost = (req, res) => {
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
    Post.findOne({ postIdx: req.params.idx }, (err, post) => {
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

exports.updatePost = (req, res) => {
    Post.findOneAndUpdate({ postIdx: req.params.idx },
                          { 
                            title: req.body.title,  
                            content: req.body.content, 
                            category: req.body.category, 
                            thumbnail: req.body.thumbnail, 
                            updatedAt: Date.now() 
                          }, (err, post) => {
                                
        if (err) {
            console.log("UPDATE POST 400".red);
            return res.json({
                message: "수정 실패",
                err
            });
         }

        console.log("UPDATE 200".green);
        return res.json({
            message: "수정 성공"
        });
    });
};

 /* exports.getPost = (req, res) => {
    Post.find((err, posts) => {
        if (err) {
            return res.json({
                message: "게시글 조회 실패",
                err
            });
        }
    }).select(["-_id", "-__v"]).then((resp) => {
        return res.json({
            message: "게시글 조회 성공",
            data: {
                posts: resp
            }
        });
    });
}; */

exports.getPost = (req, res) => {
    const postAggregate = Post.aggregate();
    const options = {
        page: req.query.page,
        limit: req.query.limit,
    }

    /* Post.aggregatePaginate(postAggregate, options, (err, results) => {
        if (err) {
            return res.json({
                message: "게시글 조회 실패",
                err
            });
        }
    }).select(["-_id", "-__v"]).then((resp) => {
        return res.json({
            message: "게시글 조회 성공",
            data: {
                posts: resp.docs
            }
        });
    }); */

    Post.aggregatePaginate(postAggregate, options).then((results) => {
        return res.json({
            message: "게시글 조회 성공",
            data: {
                posts: results.docs
            }
        });
    }).catch((err) => {
        if (err) {
            return res.json({
                message: "게시글 조회 실패",
                err
            });
        }
    }) 
};