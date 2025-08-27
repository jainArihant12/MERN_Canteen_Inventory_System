const express = require('express')

const {addToCart, fetchToCart, updateCart, deleteCart,clearCart } = require('../../controllers/shop/cart-controller')

const router = express.Router()

router.post('/addtocart',addToCart)
router.get('/get/:userId',fetchToCart)
router.put('/updateCart' , updateCart)
router.delete('/deleteCart/:userId/:productId' ,deleteCart)
router.delete('/cartClear/:userId', clearCart);
module.exports = router;