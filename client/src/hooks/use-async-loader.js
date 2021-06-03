import { useEffect, useState } from 'react';

import { useErrorHandler } from './use-error-handler';

export const useAsyncLoader = (id, asyncFunction, responseHandler) => {
    const { handler } = useErrorHandler();
    const [idHasRun, setIdHasRun] = useState(false);
    useEffect(() => {
        const get = async () => {
            try {
                const { status, data } = await asyncFunction;
                setIdHasRun(id);
                responseHandler(data, status);
            } catch (error) {
                handler(error);
            }
        };
        if (idHasRun !== id) {
            get();
        }
    }, [id, idHasRun, handler, asyncFunction, responseHandler]);
};
