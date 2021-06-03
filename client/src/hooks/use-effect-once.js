import { useEffect, useState } from 'react';

/**
 * Only run the callBack inside useEffect once
 *
 * @param {function} callback function to run once
 */
export const useEffectOnce = (callback) => {
    const [hasRun, setHasRun] = useState(false);

    useEffect(() => {
        if (!hasRun) {
            callback();
            setHasRun(true);
        }
    }, [hasRun, callback]);
};
