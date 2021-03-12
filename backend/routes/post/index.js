const router = require('express').Router();
const postCtrl = require('./post.ctrl');
const { auth }  = require('../auth/../../middleware/auth')

router.post('/', auth, postCtrl.post);
router.delete('/', auth, postCtrl.deletePost);
router.put('/:idx', auth, postCtrl.updatePost);

module.exports = router;