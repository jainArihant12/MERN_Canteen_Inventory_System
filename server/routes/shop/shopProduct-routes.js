
const express = require('express')

const { fetchFilteredProduct ,getProductDetails} = require('../../controllers/shop/product-controller');


const router = express.Router();

router.get('/get',fetchFilteredProduct)
router.get('/get/:id',getProductDetails)

module.exports = router;