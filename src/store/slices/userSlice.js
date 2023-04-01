import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../../http'
import AuthService from '../../services/AuthService'

export const registration = createAsyncThunk('auth/registration', async (userData, {rejectWithValue}) => {
    try {
        const {data} = await AuthService.registration(
            userData.email,
            userData.password,
            userData.name,
            userData.surname,
            userData.ava,
        )
        return data.user    
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const loginThunk = createAsyncThunk('auth/login', async (userData, {rejectWithValue}) => {
    try {
        const {data} = await AuthService.login(
            userData.email,
            userData.password
        )
        userData.isRemembered && localStorage.setItem('token', data.accessToken);
        return data.user
    } catch (e) {
        console.log(e)
        return rejectWithValue(e)
    }
})

export const refresh = createAsyncThunk('auth/refresh', async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api('refresh')
        localStorage.setItem('token', data.accessToken);
        return data.user
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
    try {
        await AuthService.logout()
        localStorage.removeItem('token')
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const updateUser = createAsyncThunk('auth/update', async (updates, {rejectWithValue}) => {
    try {
        const {data} = await $api.post('update', updates)
        if(updates.newPassword) alert('Пароль успешно изменен!')
        return data.user
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const loginWithEmail = createAsyncThunk('auth/login-with-email', async (email, {rejectWithValue}) => {
    try {
        const {data} = await $api.post('login-with-email', {email})
        localStorage.setItem('token', data.accessToken);
        return data.user
    } catch (e) {
        console.log(e)
        return rejectWithValue(e)
    }
})

const onPending = state => {
    state.status = 'loading'
}

const onFullfiled = (state, action) => {
    state.status = 'finish'
    state.user = action.payload
    state.isAuth = true
}

const onRejected = state => {
    state.status = 'rejected'
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        status: '',
        user: {},
        isAuth: false,
    },
    extraReducers: builder =>
        builder
            .addCase(registration.pending, onPending)
            .addCase(registration.fulfilled, onFullfiled)
            .addCase(registration.rejected, onRejected)
            .addCase(loginThunk.pending, onPending)
            .addCase(loginThunk.fulfilled, onFullfiled)
            .addCase(loginThunk.rejected, onRejected)
            .addCase(refresh.pending, onPending)
            .addCase(refresh.fulfilled, onFullfiled)
            .addCase(refresh.rejected, onRejected)
            .addCase(logout.fulfilled, state => {
                state.user = {}
                state.isAuth = false
            })
            .addCase(updateUser.pending, onPending)
            .addCase(updateUser.fulfilled, onFullfiled)
            .addCase(updateUser.rejected, onRejected)
            .addCase(loginWithEmail.pending, onPending)
            .addCase(loginWithEmail.fulfilled, onFullfiled)
            .addCase(loginWithEmail.rejected, onRejected)
})

export default userSlice.reducer
export const selectedUser = store => store.user