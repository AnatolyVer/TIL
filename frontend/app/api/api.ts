import axios from 'axios';

const api = axios.create({
    baseURL: "https://til-backend-vck5.onrender.com",
});

/*
api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response || error.response.status === 500) {
            if (!window.location.pathname.includes('/error')) {
                window.location.href = '/error';
            }
        }
        return Promise.reject(error);
    }
);
*/

export default api;
