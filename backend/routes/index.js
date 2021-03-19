const router = require('express').Router();

router.use('/api/auth', require('./auth'));
router.use('/api/post', require('./post'));
router.use('/api/upload', require('./upload'));

module.exports = router;