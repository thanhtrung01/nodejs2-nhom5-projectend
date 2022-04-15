const router = require('express').Router();

const authCTRL = require('../controllers/auth/auth.controller');

const { isAuth } = require('../middlewares/authentication');

router.post('/login', authCTRL.login);
router.post('/register', authCTRL.register);
router.post('/reset-password', isAuth, authCTRL.resetPassword);

module.exports = router;
