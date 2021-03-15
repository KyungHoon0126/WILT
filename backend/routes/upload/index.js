const router = require('express').Router();
const uploadCtrl = require('./upload.ctrl');
const { auth } = require('../auth/../../middleware/auth');

router.get('/', auth, uploadCtrl.getImage);
router.post('/', auth, uploadCtrl.upload.single('image'), uploadCtrl.uploadSingleImage);

module.exports = router;