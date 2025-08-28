const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')
const adminProductRouter = require('./routes/admin/products-route')
const shopProductRouter = require('./routes/shop/shopProduct-routes')
const shopCartRouter = require("./routes/shop/shopCart-routes")
const shopAddressRouter = require("./routes/shop/shopAddress-routes")
const shopOrderRouter = require('./routes/shop/shopOrder-routes')
const adminOrderRouter = require('./routes/admin/order-route')
const adminDashRouter = require('./routes/admin/dash-route')

require("dotenv").config();

const mongoose = require('mongoose')

mongoose.connect( process.env.MONGO_URI ).then(() => { console.log("DB Connected") })
    .catch((error) => console.log(error))

const PORT = process.env.PORT || 5000

//Cross-Origin Resource Sharing 
//a webpage from one origin can make requests to another origin.

const allowedOrigins = (process.env.FRONTEND_URL || "").split(",").map(o => o.trim()).filter(o => o);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server/Postman requests
    if (allowedOrigins.includes(origin)) {
      callback(null, origin); // allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","Cache-Control","Pragma"],
  credentials: true
}));



app.use(cookieParser());
app.use(express.json());
app.use('/api/auth' , authRouter)
app.use('/api/admin/product' , adminProductRouter)
app.use('/api/shop/product' ,shopProductRouter )
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/admin/order',adminOrderRouter)
app.use('/api/admin/dashboard' , adminDashRouter)

app.listen(PORT, (err) => {
    if (err)
        console.log(err)
    else
        console.log(`Server is running on PORT ${PORT}`)
}
)