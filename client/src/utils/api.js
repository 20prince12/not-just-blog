import axios from "axios";

const api = axios.create({
    baseURL: process.env.SERVER_URI || "http://localhost:5000/api",
});

api.interceptors.request.use(
    config => {
        config.headers['x-access-token'] = localStorage.getItem('authToken');
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



export default api;