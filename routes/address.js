const router = require('express').Router();
const {getAllAddresses, getAddress, storeAddress} = require('../controllers/address.js')

router.get('/address', getAllAddresses);
router.get('/address/:id', getAddress);
router.post('/address', storeAddress);

module.exports = router;