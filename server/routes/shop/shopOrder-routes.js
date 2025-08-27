const express = require('express');



const { addOrder , fetchAllOrder } = require('../../controllers/shop/order-controller');


const router = express.Router();


router.post('/add', addOrder);
router.get('/get/:userId', fetchAllOrder);

module.exports = router;
