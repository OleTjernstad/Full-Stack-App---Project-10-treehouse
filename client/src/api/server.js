import axios from 'axios';

export const server = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});

server.interceptors.request.use(
    async (config) => {
        console.log({ config });
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
