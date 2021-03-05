const router = require('express').Router();
const postCtrl = require('./post.ctrl');
const { auth }  = require('../auth/../../middleware/auth')

router.post('/', auth, postCtrl.post);

module.exports = router;