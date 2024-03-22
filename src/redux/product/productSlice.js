
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, getProduct, updateProduct } from './productService';
import { baseURL } from '../baseUrl';




export const getProducts = createAsyncThunk('getProducts', async () => {
    const response = await getProduct(`${baseURL}/product/get-all-products`);
    localStorage.setItem("products", JSON.stringify(response.data.product))
    return response.data;
});

export const addProduct = createAsyncThunk('createProduct', async (newProduct) => {
    const response = await createProduct(`${baseURL}/product/add-product`, newProduct);
    return response.data;
});

export const putProduct = createAsyncThunk('updateProduct', async (updatedProduct) => {
    const response = await updateProduct(`${baseURL}/product/edit-product/${updatedProduct._id}`, updatedProduct);
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
    error: "false",
    editProduct: null,
    isEdit: false
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductToEdit: (state, action) => {
            return {
                ...state, editProduct: action.payload,
                isEdit: true
            };
        }
    },
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
            .addCase(putProduct.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.sucsess = false


            }).addCase(putProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.isEdit = false

            }).addCase(putProduct.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false

            })
    },
});

export const { setProductToEdit } = productSlice.actions
export default productSlice.reducer;
