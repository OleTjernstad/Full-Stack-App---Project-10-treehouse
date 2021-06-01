import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export const useErrorHandler = () => {
    const [errors, setErrors] = useState([]);
    const history = useHistory();

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
