const Cart = require('../../models/cart')
const product = require('../../models/product')

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate input
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data during Cart operation',
            });
        }

        // Check if product exists
        const foundProduct = await product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Find or create user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if product is already in cart
        const existingProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingProductIndex === -1) {
            // Product not in cart, add new item
            cart.items.push({ productId, quantity });
        } else {
            // Product exists, update quantity
            cart.items[existingProductIndex].quantity += quantity;
        }

        // Save the cart
        await cart.save();



        res.status(200).json({ success: true, data: cart });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

const fetchToCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data during Cart fetch',
            });
        }

        // Fetch cart and populate product details
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found',
            });
        }

        // Remove any items with missing product reference
        const validatedItems = cart.items.filter(item => item.productId);

        if (validatedItems.length < cart.items.length) {
            cart.items = validatedItems;
            await cart.save();
        }

        // Prepare cart data to return only necessary info
        const populatedCart = validatedItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        // Send back the cleaned and populated cart
        res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populatedCart },
        });

    } catch (error) {
        console.error("Error to Fetch Cart:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error Occurred",
        });
    }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Input validation
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data during Cart operation',
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart Not Found',
      });
    }

    // Find index of product in cart
    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not present',
      });
    }

    // Update quantity
    cart.items[existingProductIndex].quantity = quantity;

    // Save updated cart
    await cart.save();

    // Populate product details for the response
    await cart.populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    // Prepare cleaned cart data
    const populatedCart = cart.items
      .filter(item => item.productId) // remove any null products (just in case)
      .map(item => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      }));

    // Send updated cart
    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedCart },
    });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error Occurred",
    });
  }
};





const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
     console.log( userId, productId);
    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data during Cart operation',
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart Not Found',
      });
    }

    // Find the item index in the cart
    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId && item.productId._id.toString() === productId
    );

    if (existingProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    // Remove the item from the cart
    cart.items.splice(existingProductIndex, 1);

    // Save the updated cart
    await cart.save();

    // Re-populate to get updated product details
    await cart.populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    // Prepare cleaned response data
    const populatedCart = cart.items.map(item => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    // Send success response
    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedCart },
    });

  } catch (error) {
    console.error("Error to delete product from cart:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error Occurred",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    console.log(req.params);
    
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Clear items array
    cart.items = [];

    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};


module.exports = { addToCart, fetchToCart, updateCart, deleteCart ,clearCart }