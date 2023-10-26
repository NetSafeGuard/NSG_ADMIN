import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('@nsg_token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})