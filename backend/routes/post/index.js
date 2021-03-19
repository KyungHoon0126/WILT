const router = require('express').Router();
const postCtrl = require('./post.ctrl');
const { auth }  = require('../auth/../../middleware/auth')

router.post('/', auth, postCtrl.createPost);
router.delete('/', auth, postCtrl.deletePost);
router.put('/:idx', auth, postCtrl.updatePost);
router.get('/', postCtrl.getPost);
router.get('/page', postCtrl.getPostPerPage);

module.exports = router;