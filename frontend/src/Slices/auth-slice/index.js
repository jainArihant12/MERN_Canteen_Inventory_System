import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData, { withCredentials: true })
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const loginUser = createAsyncThunk('/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData, { withCredentials: true })
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const logout = createAsyncThunk('/auth/logout',
    async ( _,{ rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logout', {},{ withCredentials: true })
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const checkAuth = createAsyncThunk('/auth/check-auth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/check-auth',
                {
                    withCredentials: true,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
                    }
                })
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    })


export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: () => {

        }

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = !action.payload.success ? null : action.payload.user;
            state.isAuthenticated = !action.payload.success ? false : true;
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = !action.payload.success ? null : action.payload.user;
            state.isAuthenticated = !action.payload.success ? false : true;
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer