import axios from 'axios';

export const server = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});

server.interceptors.request.use(
    async (config) => {
        const auth = JSON.parse(localStorage.getItem('@course:auth'));
        console.log(auth, 'server interceptor');
        if (auth) {
            config.auth = {
                username: auth.emailAddress,
                password: auth.password
            };
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
