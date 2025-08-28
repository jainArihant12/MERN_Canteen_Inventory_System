import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAllOrdersAdmin = createAsyncThunk(
  'adminOrder/fetchAllOrdersAdmin',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/admin/order/fetch`);
      return response.data.orders;  // assuming backend sends { success, orders }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const updateOrderStatus = createAsyncThunk(
  'adminOrder/updateOrderStatus',
  async ({ orderId, status }, thunkAPI) => {
    try {  
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/order/${orderId}/status`,
        { status }
      );
      return response.data.order;  // updated order
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState: {
    orderList: [],
    isLoading: false,
    error: null,
    updateSuccess: false,
  },
  reducers: {
    clearUpdateSuccess(state) {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllOrdersAdmin
      .addCase(fetchAllOrdersAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })

      // updateOrderStatus
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateSuccess = true;
        // Update the specific order in orderList
        const index = state.orderList.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orderList[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update order status';
        state.updateSuccess = false;
      });
  },
});

export const { clearUpdateSuccess } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
