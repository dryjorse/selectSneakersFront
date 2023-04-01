import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../../http'

export const getProduct = createAsyncThunk('porduct', async (id, {rejectWithValue}) => {
    try {
        const {data} = await $api('products', {params: {id: id.join(',')}})
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        status: '',
        product: {},
    },
    extraReducers: builder =>
        builder
            .addCase(getProduct.pending, state => {
                state.status = 'loading'
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product = action.payload
                state.status = 'finish'
            })
            .addCase(getProduct.rejected, state => {
                state.status = 'rejected'
            })
})

export default productSlice.reducer
export const selectedProduct = store => store.product