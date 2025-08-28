import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orderList: [],
  isLoading: false,
  error: null,
  addOrderSuccess: false,
};

export const addOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderList, thunkAPI) => {
    try {
    console.log(orderList);
    
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/shop/order/add`,
        orderList
      );
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllOrder = createAsyncThunk(
  'order/fetchOrder',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/shop/order/get/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'shopOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle addOrder lifecycle
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.addOrderSuccess = false;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addOrderSuccess = true;
        // Optionally, push newly added order into orderList if backend returns it
        if (action.payload?.order) {
          state.orderList.push(action.payload.order);
        }
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to place order';
        state.addOrderSuccess = false;
      })

      // Handle fetchAllOrder lifecycle
      .addCase(fetchAllOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.orders || [];
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });
  },
});



export default orderSlice.reducer;
