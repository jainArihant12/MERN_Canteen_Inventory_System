const User = require('../../models/user')
const Order = require('../../models/order')
const Product = require('../../models/product')

const countUsers = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching customer count:", error);
    res.status(500).json({ error: 'Server error' });
  }
}

const TotalOrder = async (req, res)=>{
     try {
    // Get total orders count
    const totalOrders = await Order.countDocuments();

    // Count for each status
    const pendingCount = await Order.countDocuments({ status: 'pending' });
    const deliveredCount = await Order.countDocuments({ status: 'delivered' });
    const inProcessCount = await Order.countDocuments({ status: 'inProcess' });

    res.json({
      totalOrders,
      pending: pendingCount,
      delivered: deliveredCount,
      inProcess: inProcessCount,
    });
  } catch (error) {
    console.error("Error fetching order counts:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

const getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.json({ totalProducts });
  } catch (error) {
    console.error("Error getting product count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports =  {countUsers , TotalOrder , getTotalProducts}