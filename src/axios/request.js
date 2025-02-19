import axios from 'axios'
import router from '@/router/index.js'

const requestAxios = axios.create({
    baseURL: import.meta.env.VITE_FB_DATABASE,
})

requestAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }
    return Promise.reject(error);
});

export default requestAxios