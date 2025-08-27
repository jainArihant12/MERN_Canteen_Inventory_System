
const Product = require('../../models/product');
const Order = require('../../models/order');

// Fetch all orders with product and user details for admin

const fetchAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    // For each order, update items with product snapshot data
    
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Update order status by admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log(status,orderId);
    
    const validStatuses = ['pending', 'inProcess', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { fetchAllOrdersAdmin, updateOrderStatus };
