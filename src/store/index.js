import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import gifsSlice from './slices/gifsSlice'
import newsSlice from './slices/newsSlice'
import productSlice from './slices/productSlice'
import productsSlice from './slices/productsSlice'
import reviewsSlice from './slices/reviewsSlice'
import searchSlice from './slices/searchSlice'
import similarSlice from './slices/similarSlice'
import trandsSlice from './slices/trandsSlice'

export default configureStore({
    reducer: {
        news: newsSlice,
        gifs: gifsSlice,
        trands: trandsSlice,
        reviews: reviewsSlice,
        searched: searchSlice,
        product: productSlice,
        similar: similarSlice,
        filter: filterSlice,
        products: productsSlice,
    }
})