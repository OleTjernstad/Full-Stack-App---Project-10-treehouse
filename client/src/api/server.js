import axios from 'axios';

/**
 * Create a axios instance
 */
export const server = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});

/**
 * axios interceptor to att auth to every request if user is signed in
 */
server.interceptors.request.use(
    async (config) => {
        const auth = JSON.parse(localStorage.getItem('@course:auth'));
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

/**
 * Api url for all courses
 * @returns string
 */
export const getAllCourses = () => {
    return 'api/courses';
};

/**
 * api url for getting course by id
 * @returns string
 */
export const getCourseById = (id) => {
    return `api/courses/${id}`;
};
