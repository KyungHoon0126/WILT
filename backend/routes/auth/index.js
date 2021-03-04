const router = require('express').Router();
const authCtrl = require('./auth.ctrl');

router.post('/signUp', authCtrl.signUp);
router.post('/login', authCtrl.login);

module.exports = router;