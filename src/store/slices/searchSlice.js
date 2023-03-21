import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../../http'

export const getSearchedProducts = createAsyncThunk('search', async (search, {rejectWithValue}) => {
    try {
        const {data} = await $api('products', {params: {search}})
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
        status: '',
        products: []
    },
    extraReducers: builder =>
        builder
            .addCase(getSearchedProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSearchedProducts.fulfilled, (state, action) => {
                state.status = 'finish'
                state.products = action.payload
            })
            .addCase(getSearchedProducts.rejected, (state) => {
                state.status = 'rejected'
            })
})

export default searchSlice.reducer
export const selectedSearched = store => store.searched