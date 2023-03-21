import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";


export const getTrands = createAsyncThunk('trands', async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api.get('products', {params: {
            trands: true,
        }})
        return data
    } catch(e) {
        return rejectWithValue(e)
    }
})

const trandsSlice = createSlice({
    name: 'trandsSlice', 
    initialState: {
        status: '',
        trands: []
    },
    extraReducers: builder =>
        builder
            .addCase(getTrands.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getTrands.fulfilled, (state, action) => {
                state.status = 'finish'
                state.trands = action.payload
            })
            .addCase(getTrands.rejected, (state) => {
                state.status = 'rejected'
            })
})

export default trandsSlice.reducer
export const selectedTrands = store => store.trands