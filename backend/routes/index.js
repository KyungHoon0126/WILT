const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/post', require('./post'));
router.use('/upload', require('./upload'));

module.exports = router;