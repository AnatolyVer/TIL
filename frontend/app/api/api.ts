import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
});

/*api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response || error.response.status === 500) {
            if (!window.location.pathname.includes('/error')) {
                window.location.href = '/error';
            }
        }
        return Promise.reject(error);
    }
);*/

export default api;
