import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

export const getGifs = createAsyncThunk('gifs', async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api('gifs')
        return data
    } catch (e) {
        console.log(e);
        return rejectWithValue(e)
    }
})

const gifsSlice = createSlice({
    name: 'gifsSlice',
    initialState: {
        status: '',
        gifs: []
    },
    extraReducers: builder =>
        builder
            .addCase(getGifs.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getGifs.fulfilled, (state, action) => {
                state.status = 'finish'
                state.gifs = action.payload
            })
            .addCase(getGifs.rejected, (state) => {
                state.status = 'rejected'
            })
})

export default gifsSlice.reducer
export const selectedGif = store => store.gifs