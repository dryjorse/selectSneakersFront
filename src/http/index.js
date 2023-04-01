import axios from 'axios'

export const API_URL = 'https://real-rose-badger-vest.cyclic.app'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bareer ${localStorage.getItem('token')}`
    return config;
})

export default $api;