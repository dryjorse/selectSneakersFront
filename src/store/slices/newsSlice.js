import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import $api from '../../http'

export const getNews = createAsyncThunk('news', async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api.get('news')
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState: {
        status: '',
        news: []
    },
    reducers: {
        
    },
    extraReducers: builder => 
        builder
            .addCase(getNews.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.status = 'finish'
                state.news = action.payload
            })
            .addCase(getNews.rejected, (state) => {
                state.status = 'rejected'
            })
})

export default newsSlice.reducer
export const selectedNews = store => store.news