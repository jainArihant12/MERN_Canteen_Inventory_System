import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  cartItems: []
}

export const addToCart = createAsyncThunk('/cart/add', async ({ userId, productId, quantity }) => {

  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/shop/cart/addtocart`, { userId, productId, quantity });
  return response?.data || [];

});

export const fetchCartItems = createAsyncThunk('/cart/fetch', async (userId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/shop/cart/get/${userId}`);
  return response.data || [];
});

export const updateCart = createAsyncThunk('/cart/update', async ({ userId, productId, quantity }) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/api/shop/cart/updateCart`, { userId, productId, quantity });
  return response?.data || [];
});

export const deleteCart = createAsyncThunk('/cart/delete', async ({ userId, productId }) => {

  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/api/shop/cart/deleteCart/${userId}/${productId}`);

  return response?.data || [];
});

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, thunkAPI) => {
    
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/api/shop/cart/cartClear/${userId}`);
      console.log(response);
      return response.data;
         
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cart_Slice = createSlice({
  name: 'shopCart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cartItems = action.payload.data || null;

      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add To Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update Cart
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete Cart Item
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }).addCase(clearCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(clearCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = [];  // clear cart items on success
    })
    .addCase(clearCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || action.error.message;
    });

  },
});

export default cart_Slice.reducer;