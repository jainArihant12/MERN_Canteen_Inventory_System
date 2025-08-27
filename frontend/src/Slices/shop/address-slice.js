import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState= {
    isLoading: false,
    addressList : []
}

export const addAddress = createAsyncThunk('/address/addAddress' , async (addressList)=>{
  
  
    const response = await axios.post(`${import.meta.env.VITE_Backend_API_URL}/api/shop/address/add`, addressList)
    
    
    
    return response.data
})

export const fetchAddress = createAsyncThunk('/address/fetchAddress' , async (userId)=>{
  
  
    const response = await axios.get(`${import.meta.env.VITE_Backend_API_URL}/api/shop/address/get/${userId}` )
    return response.data
})

export const updateAddress = createAsyncThunk('/address/updateAddress' , async ({userId , addressId ,addressList})=>{
  console.log(userId , addressId ,addressList);
  
    const response = await axios.put(`${import.meta.env.VITE_Backend_API_URL}/api/shop/address/update/${userId}/${addressId}`,addressList  )
    return response.data
})

export const deleteAddress = createAsyncThunk('/address/deleteAddress' , async ({userId , addressId})=>{
  
  
    const response = await axios.delete(`${import.meta.env.VITE_Backend_API_URL}/api/shop/address/delete/${userId}/${addressId}`)
    return response.data
})

 const address_Slice = createSlice({
    name: 'shopAddress' ,
    initialState,
    reducers :{},
    extraReducers :(builder)=>{
       builder
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.addressList.push(action.payload.data); // Assuming response contains {data: address}
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      })

      // Fetch Address
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data; // Assuming response contains {data: [addresses]}
       
        
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        const updated = action.payload.data; // Assuming response {data: updatedAddress}
        state.addressList = state.addressList.map(addr =>
          addr._id === updated._id ? updated : addr
        );
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        const deletedId = action.payload.data._id; // Assuming {data: deletedAddress}
        state.addressList = state.addressList.filter(addr => addr._id !== deletedId);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
    }
 })

 export default address_Slice.reducer