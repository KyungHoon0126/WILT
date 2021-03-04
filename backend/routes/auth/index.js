const router = require('express').Router();
const authCtrl = require('./auth.ctrl');
const { auth } = require('../auth/../../middleware/auth')

router.post('/signUp', authCtrl.signUp);
router.post('/login', authCtrl.login);
router.post('/',  auth, authCtrl.auth);
router.post('/logout', auth, authCtrl.logout);

module.exports = router;