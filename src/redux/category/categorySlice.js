// todosSlice.jscategory
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createCategory, deleteCategory, getCategory, updateCategory } from './categoryService';
import { baseURL } from '../baseUrl';




export const getCategories = createAsyncThunk('getCategorys', async () => {
    const response = await getCategory(`${baseURL}/category/`);
    localStorage.setItem("categories", JSON.stringify(response.data.categories))
    return response.data;
});

export const addCategory = createAsyncThunk('createCategory', async (newCategory) => {
    const response = await createCategory(`${baseURL}/category/create`, newCategory);
    console.log(response.data);
    return response.data;

});
export const putCategory = createAsyncThunk('updateCategory', async (updatedCategory) => {
    const response = await updateCategory(`${baseURL}/category/${updateCategory._id}`, updatedCategory);
    return response.data;
});

export const delCategory = createAsyncThunk('deleteCategory', async (CategoryId) => {
    await deleteCategory(`${baseURL}/category/${CategoryId}`);
    return CategoryId;
});





const initialState = {
    Categories: [],
    loading: "false",
    sucsess: "false",
    error: "false"

}


const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true
                state.error = false
                state.sucsess = false


            }).addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.Categories = action.payload
            }).addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false

            }).addCase(addCategory.pending, (state) => {
                state.loading = true
                state.error = false
                state.sucsess = false

            }).addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.Categories = action.payload
            }).addCase(addCategory.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false
            }).addCase(delCategory.pending, (state) => {
                state.loading = true
                state.error = false
                state.sucsess = false

            }).addCase(delCategory.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.Categories.categories.filter(c => c._id !== action.meta.arg)
            }).addCase(delCategory.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false
            })

    },
});

export default CategorySlice.reducer;
