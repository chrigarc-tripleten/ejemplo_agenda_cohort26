const router = require('express').Router();
const { login, register } = require('../controllers/users.js')

router.post('/login', login);
router.post('/register', register);
//signin
//signup
module.exports = router;