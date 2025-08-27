

import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authReducer from '../Slices/auth-slice/index'
import adminProductSlice from '../Slices/admin/product_slice'
import shopProductSlice from '../Slices/shop/product-slice'
import shopCartSlice from '../Slices/shop/cart-slice'
import shopAddressSlice from '../Slices/shop/address-slice'
import shopOrderSlice from '../Slices/shop/order-slice'
import adminOrderSlice from '../Slices/admin/order-slice'
const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductSlice,
        adminOrders : adminOrderSlice,
        shopProducts : shopProductSlice,
        shopCart : shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder : shopOrderSlice,
        
    }
})

export default store