const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Image } = require('../../models/Image');
require('colors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now());
    }
}); 

exports.upload = multer({ storage: storage });

exports.getImage = (req, res) => {
    Image.find({}, (err, images) => {
        if (err) {
            console.log(err.message);    
            res.status(500).json({
                message: "서버 오류",
                err
            });
        } else {
            res.status(200).json({
                message: "이미지 조회 성공",
                images: images
            });
        }
    });
};

exports.uploadSingleImage = (req, res, next) => {
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        image: req.file.filename

        // 이미지 자체를 DB에 저장할 때
        // image: {
        //     data: fs.readFileSync(path.join(__dirname, '../../public/') + req.file.filename),
        //     contentType: 'image/png'
        // }
    };

    Image.create(obj, (err, image) => {
        if (err) {  
            console.log(err);
            res.status(500).json({
                message: "이미지 업로드 실패"
            });
        } else {
            // res.redirect('/');

            res.status(200).json({
                message: "이미지 업로드 성공",
            });
        }   
    });
};