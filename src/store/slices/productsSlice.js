import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";


export const getProducts = createAsyncThunk('products', async(params, {rejectWithValue}) => {
    try {
        const {data} = await $api('products')
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})



const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        status: '',
        products: [],
        pricesLimit: {
            minPrice: 0,
            maxPrice: 0,
        },
        count: 0,
        limit: 0,
    },
    reducers: {
        setLimit: (state, action) => {
            state.limit = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload?.result
                state.pricesLimit = action.payload?.pricesLimit
                state.count = action.payload?.count
                
                if(state.limit === 0) {
                    state.limit = action.payload?.limit
                }

                state.status = 'finish'
            })
            .addCase(getProducts.rejected, state => {
                state.status = 'rejected'
            })
})

export default productsSlice.reducer
export const selectedProducts = store => store.products
export const {setLimit} = productsSlice.actions