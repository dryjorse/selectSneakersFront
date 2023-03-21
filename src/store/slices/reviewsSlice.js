import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";


export const getReviews = createAsyncThunk('reviews', async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api('reviews')
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})

const reviewsSlice = createSlice({
    name: 'reviewsSlice',
    initialState: {
        status: '',
        reviews: []
    },
    extraReducers: builder => 
        builder
            .addCase(getReviews.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.status = 'finish'
                state.reviews = action.payload
            })
            .addCase(getReviews.rejected, (state) => {
                state.status = 'rejected'
            })
})

export default reviewsSlice.reducer
export const selectedReviews = store => store.reviews