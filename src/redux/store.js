import { configureStore } from '@reduxjs/toolkit'

import productsReducer from "../redux/product/productSlice"
import categoryReducer from "../redux/category/categorySlice"
import userReducer from "../redux/login/loginSlice"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoryReducer,
        user: userReducer

    },
})