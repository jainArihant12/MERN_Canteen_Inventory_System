import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    productDetail:null
}

export const fetchFilteredProduct = createAsyncThunk('/listing/fetchProduct', async ({filtersParams ,sortParams}) => {

    const query = new URLSearchParams({
        ...filtersParams,
        sortBy:sortParams
    }).toString();
    const result = await axios.get(`http://localhost:5000/api/shop/product/get?${query}`)
    return result?.data?.data || [];
})

export const fetchProductDetails = createAsyncThunk('/listing/fetchProductDetails', async (id) => {
    const result = await axios.get(`http://localhost:5000/api/shop/product/get/${id}`)
    return result?.data?.data || [];
})

const product_Slice = createSlice({
    name: 'shopProduct ',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredProduct.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchFilteredProduct.fulfilled, (state, action) => {
                state.isLoading = false;

                // Ensure payload is an array before assigning
                state.productList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchFilteredProduct.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.error.message;
            }).addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;

                // Ensure payload is an array before assigning
                state.productDetail = action.payload
            })
            .addCase(fetchProductDetails.rejected, (state,action) => {
                state.isLoading = false;
                state.productDetail = null
                state.error = action.error.message;
            })


    }

})
export default product_Slice.reducer;