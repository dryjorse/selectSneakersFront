import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../../http'

export const getFilterItems = createAsyncThunk('filter-items', async(_, {rejectWithValue}) => {
    try {
        const {data} = await $api('filter-items')
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: {
        status: '',
        filterItems: {},
        categories: [],
        brands: [],
        sizes: [],
        seasons: [],
        colors: [],
        selectedColor: '',
        prices: [],
        page: 1,
        type: '',
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setBrands: (state, action) => {
            state.brands = action.payload
        },
        setSizes: (state, action) => {
            state.sizes = action.payload
        },
        setSeasons: (state, action) => {
            state.seasons = action.payload
        },
        setColors: (state, action) => {
            state.colors = action.payload
        },
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload
        },
        setPrices: (state, action) => {
            state.prices = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setType: (state, action) => {
            state.type = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getFilterItems.pending, state => {
                state.status = 'loading'
            })
            .addCase(getFilterItems.fulfilled, (state, action) => {
                state.filterItems = action.payload
                state.status = 'finish'
            })
            .addCase(getFilterItems.rejected, state => {
                state.status = 'rejected'
            })
})

export default filterSlice.reducer
export const {
    setCategories,setBrands, setSizes, setSeasons, 
    setColors, setSelectedColor, setPrices, setPage, setType
} = filterSlice.actions
export const selectedFilter = store => store.filter