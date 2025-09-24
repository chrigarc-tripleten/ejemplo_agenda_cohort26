const router = require('express').Router();
const {getUsers, getUser, createUser, me} = require('../controllers/users.js')

router.get('/users', getUsers);
router.get('/users/me', me);
router.get('/users/:id', getUser);
router.post('/users', createUser);


module.exports = router;