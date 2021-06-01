import { useHistory } from 'react-router-dom';
import { useState } from 'react';

/**
 * Hook for handling error codes from the api, set errors or redirect to the correct error path
 * @returns {handler, errors}
 */
export const useErrorHandler = () => {
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    /**
     * check error status and act based on it
     * @param {object} error the error object from the response
     */
    const handler = (error) => {
        switch (error.response.status) {
            case 400:
                setErrors(error.response.data.errors);
                break;
            case 401:
                history.replace('/signin');
                break;
            case 403:
                history.replace('/forbidden');
                break;
            case 404:
                history.replace('/notfound');
                break;

            default:
                history.replace('/error');
                break;
        }
    };

    return { handler, errors };
};
