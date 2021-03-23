const router = require('express').Router();
const postCtrl = require('./post.ctrl');
const { auth }  = require('../auth/../../middleware/auth')

router.post('/', auth, postCtrl.createPost);
router.delete('/:idx', auth, postCtrl.deletePost);
router.put('/:idx', auth, postCtrl.updatePost);
// router.get('/', postCtrl.getPost);
router.get('/', postCtrl.getPost);

module.exports = router;