const express = require('express');
const borrowController = require('../controllers/borrowConroller');

const router = express.Router();

router.get('/', borrowController.getBorrow);
router.post('/addborrow', borrowController.addBorrow);
router.put('/updateAvalibale/:id', borrowController.updateAvalibale);
router.put('/updateReturnBorrow', borrowController.updateReturnBorrow);

module.exports = router;
