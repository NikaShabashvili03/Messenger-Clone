import axios from 'axios'

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = await localStorage.getItem('token');

    return config
})

export default instance;