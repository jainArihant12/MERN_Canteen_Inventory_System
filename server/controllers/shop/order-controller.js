const Order = require('../../models/order')
const Product = require('../../models/product');

const addOrder = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    console.log("Add order called", req.body);

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "No Order Item Given" });
    }
    if (!address || !address.address || !address.city || !address.pincode || !address.phone || !address.notes) {
      return res.status(400).json({ success: false, message: "Complete Address Required" });
    }

    // Fetch product details for each item to snapshot info
    const detailedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      return {
        productId: product._id,
        title: product.title,
        image: product.image,
        price: product.salePrice > 0 ? product.salePrice : product.price,
        quantity: item.quantity,
      };
    }));

    // Create order with detailed items
    const order = new Order({
      userId,
      items: detailedItems,
      address,
    });

    await order.save();

    res.status(200).json({ success: true, message: 'Order Placed Successfully', order });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchAllOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Fetch orders for user; no need to populate productId since data saved inside order
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addOrder, fetchAllOrder };

