import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://my-burger-builder-545bd.firebaseio.com/'
});

export default axiosInstance;