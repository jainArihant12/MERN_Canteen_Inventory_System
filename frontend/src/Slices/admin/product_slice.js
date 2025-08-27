import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false , 
    productList : []
}

export const addNewProduct = createAsyncThunk('/product/addnewproduct' , async (formData)=> {
    const result = await axios.post(`${import.meta.env.VITE_Backend_API_URL}/api/admin/product/add` , formData , 
        {
            headers: {
                "Content-Type" : 'application/json'
            }
        }
    )
    return result?.data;
})

export const fetchAllProduct = createAsyncThunk('/product/fetchAllProduct' , async ()=> {
    const result = await axios.get(`${import.meta.env.VITE_Backend_API_URL}/api/admin/product/get` )
 
   return result?.data?.data || [];
})

export const editAProduct = createAsyncThunk('/product/editAProduct' , async ({id , formData})=> {
    const result = await axios.put(`${import.meta.env.VITE_Backend_API_URL}/api/admin/product/edit/${id}`, formData , 
        {
            headers: {
                "Content-Type" : 'application/json'
            }
        }
    )
    
    return result?.data;
})

export const deleteProduct = createAsyncThunk('/product/deleteProduct' , async (id)=> {
    const result = await axios.delete(`${import.meta.env.VITE_Backend_API_URL}/api/admin/product/delete/${id}`
    )
    return result?.data;
})

const product_Slice = createSlice({
    name: 'adminProduct ',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
  builder
    // Add New Product
    .addCase(addNewProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;

      // Ensure productList is always an array before pushing
      if (Array.isArray(state.productList)) {
        state.productList.push(action.payload);
      } else {
        state.productList = [action.payload];
      }
    })
    .addCase(addNewProduct.rejected, (state) => {
      state.isLoading = false;
    })

    // Fetch All Products
    .addCase(fetchAllProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;

      // Ensure payload is an array before assigning
      state.productList = Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(fetchAllProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = action.error.message;
    })

    // Edit Product
    .addCase(editAProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(editAProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.productList.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.productList[index] = action.payload;
      }
    })
    .addCase(editAProduct.rejected, (state) => {
      state.isLoading = false;
    })

    // Delete Product
    .addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = state.productList.filter(p => p._id !== action.payload._id);
    })
    .addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });
}

})
export default product_Slice.reducer;