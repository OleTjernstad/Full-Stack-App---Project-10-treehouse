import { createContext, useContext, useState } from 'react';

import { server } from '../api/server';
import { useErrorHandler } from './use-error-handler';

const Context = createContext();

/**
 * UseAuth context
 * @returns context
 */
export const useAuth = () => {
    return useContext(Context);
};

/**
 * The context provider with functions and global state
 *
 * @param {props} children
 * @returns
 */
export const Provider = ({ children }) => {
    const [user, setUser] = useState();
    const [hasCheckedLocal, setHasCheckedLocal] = useState(false);
    const { handler } = useErrorHandler();

    /**
     * Log in the user and persist the user to local state
     *
     * @param {string} emailAddress users email
     * @param {string} password users password
     * @returns
     */
    const signIn = async (emailAddress, password) => {
        const auth = {
            username: emailAddress,
            password: password
        };

        try {
            const { status, data } = await server.get('api/users', {
                auth: auth
            });

            if (status === 200) {
                setUser(data.user);
                localStorage.setItem(
                    '@course:auth',
                    JSON.stringify({ ...data.user, password: password })
                );
                return true;
            }
        } catch (error) {
            handler(error);
        }

        return false;
    };

    /**
     * Set user state to undefined and remove the persisted user from local storage
     */
    const signOut = () => {
        setUser(undefined);
        localStorage.removeItem('@course:auth');
    };

    /**
     * load user from local storage to state
     */
    const loadUserFromStorage = () => {
        const auth = JSON.parse(localStorage.getItem('@course:auth'));
        setUser(auth);
        setHasCheckedLocal(true);
    };

    return (
        <Context.Provider
            value={{
                user,
                signIn,
                signOut,
                loadUserFromStorage,
                hasCheckedLocal
            }}
        >
            {children}
        </Context.Provider>
    );
};
