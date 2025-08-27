const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
        productId : { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        title: String,       // snapshot product title
        image: String,       // snapshot product image
        price: Number,       // price at order time (salePrice or price)
        quantity: Number,
         }
    ],
    address: {
        userId: String,
        address: String,
        city: String,
        pincode: String,
        phone: Number,
        notes: String
    },
    status: {
    type: String,
    enum: ["pending", "inProcess", "shipped", "delivered", "cancelled"],  // ✅ Order Status
    default: "pending",
  },
   createdAt: { type: Date, default: Date.now }
})

module.exports =  mongoose.model("Order", orderSchema);