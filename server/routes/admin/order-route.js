
const express = require('express');
const router = express.Router();

const { 
  fetchAllOrdersAdmin, 
  updateOrderStatus 
} = require('../../controllers/admin/order-controller');

// GET all orders for admin
router.get('/fetch', fetchAllOrdersAdmin);

// put update order status by admin
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;
