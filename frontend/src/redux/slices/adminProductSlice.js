import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// 1. තනි භාණ්ඩයක විස්තර ID එක මඟින් ලබා ගැනීමට අලුතින් එක් කළ Thunk එක (EditProductPage එකට අත්‍යවශ්‍යයි)
export const fetchProductDetails = createAsyncThunk(
    "adminProducts/fetchProductDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/products/${id}`); // backend route එක පරික්ෂා කරගන්න
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/products`, {
                headers: {
                    Authorization: USER_TOKEN,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// async function to create a new product
export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/products`,
                productData,
                {
                    headers: {
                        Authorization: USER_TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// async thunk to update an existing product
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/products/${id}`,
                productData,
                {
                    headers: {
                        Authorization: USER_TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/products/${id}`, {
                headers: { Authorization: USER_TOKEN },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        selectedProduct: null, // 2. EditProductPage එකේදී selectedProduct එක read කරන්න මෙතන null ලෙස තැබුවා
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // 3. fetchProductDetails සඳහා Reducers කොටස එක් කිරීම
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload; // ලැබෙන දත්ත selectedProduct එකට දැමීම
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.selectedProduct = action.payload; // සකස් කල පසු දැනට තෝරාගෙන ඇති product එකත් update කිරීම
            })
            
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            });
    },
});

export default adminProductSlice.reducer;