import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";


export const getSimilarProducts = createAsyncThunk('similar', async(id, {rejectWithValue}) => {
    try {
        const {data} = await $api('products', {params: {
            similarTo: id
        }})
        return data
    } catch(e) {
        return rejectWithValue(e)
    }
})

const similarSlice = createSlice({
    name: 'similarSlice',
    initialState: {
        status: '',
        products: []
    },
    extraReducers: builder =>
        builder
            .addCase(getSimilarProducts.pending, state => {
                state.status = 'loading'
            })
            .addCase(getSimilarProducts.fulfilled, (state, action) => {
                state.products = action.payload?.result
                state.status = 'finish'
            })
            .addCase(getSimilarProducts.rejected, state => {
                state.status = 'rejected'
            })
            
})

export default similarSlice.reducer
export const selectedSimilarProducts = store => store.similar