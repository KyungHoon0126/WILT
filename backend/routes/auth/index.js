const router = require('express').Router();
const authCtrl = require('./auth.ctrl');
const { auth } = require('../auth/../../middleware/auth')

router.post('/signUp', authCtrl.signUp);
router.post('/login', authCtrl.login);
router.get('/auth',  auth, authCtrl.auth);
router.get('/logout', auth, authCtrl.logout);

module.exports = router;