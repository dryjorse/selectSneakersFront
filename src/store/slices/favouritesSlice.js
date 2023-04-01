import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http"

export const getFavouriteProducts = createAsyncThunk('favourite-products', async(idArr, {rejectWithValue}) => {
    try {
        const {data} = await $api('products', {params: {productsById: idArr.join(',')}})
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})

const favouritesSlice = createSlice({
    name: 'favouritesSlice',
    initialState: {
        status: '',
        products: []
    },
    extraReducers: builder =>
        builder
            .addCase(getFavouriteProducts.pending, state => {
                state.status = 'loading'
            })
            .addCase(getFavouriteProducts.fulfilled, (state, action) => {
                state.status = 'finish'
                state.products = action.payload
            })
            .addCase(getFavouriteProducts.rejected, state => {
                state.status = 'rejected'
            })
})

export default favouritesSlice.reducer
export const selectedFavourites = store => store.favourites