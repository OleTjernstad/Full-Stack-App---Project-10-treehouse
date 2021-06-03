import { useEffect, useState } from 'react';

import { server } from '../api/server';
import { useErrorHandler } from './use-error-handler';

/**
 * Hook to async load data from server
 * @param {string} query the querystring for getting data from the server
 * @param {function} responseHandler function to handle the response data
 */
export const useAsyncLoader = (query, responseHandler) => {
    const { handler } = useErrorHandler();
    const [queryHasRun, setQueryHasRun] = useState('');

    useEffect(() => {
        if (queryHasRun !== query) {
            const get = async () => {
                try {
                    const { status, data } = await server.get(query);
                    setQueryHasRun(query);
                    responseHandler(data, status);
                } catch (error) {
                    handler(error);
                }
            };
            get();
        }
    });
};
