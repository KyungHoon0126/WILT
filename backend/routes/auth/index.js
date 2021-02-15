const router = require('express').Router();
const authCtrl = require('./auth.ctrl');

router.post('/signUp', authCtrl.signUp);

module.exports = router;