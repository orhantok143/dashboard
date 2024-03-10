// todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import product from './todosService'; // Servis fonksiyonlarını içe aktar
import { createProduct, deleteProduct, getProduct, updateProduct } from './productService';
import { baseURL } from '../baseUrl';



export const getProducts = createAsyncThunk('getProducts', async () => {
    const response = await getProduct(`${baseURL}/product/get-all-products`);
    return response.data;
});

export const addProduct = createAsyncThunk('createProduct', async (newProduct) => {
    const response = await createProduct(`${baseURL}/product/add-product`, newProduct);
    return response.data;
});

export const putProduct = createAsyncThunk('updateProduct', async (updatedProduct) => {
    const response = await updateProduct(`/product/${updatedProduct.id}`, updatedProduct);
    return response.data;
});

export const delProduct = createAsyncThunk('deleteProduct', async (productId) => {
    await deleteProduct(`${baseURL}/product/delete-product/${productId}`);
    return productId;
});


const initialState = {
    products: [],
    loading: "false",
    sucsess: "false",
    error: "false"

}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.sucsess = false

            }).addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.products = action.payload
            }).addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false

            }).addCase(addProduct.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.sucsess = false


            }).addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.products = action.payload

            }).addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false

            }).addCase(delProduct.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.sucsess = false


            }).addCase(delProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true


            }).addCase(delProduct.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false

            })

    },
});

export default productSlice.reducer;
