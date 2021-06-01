import { createContext, useContext, useState } from 'react';

import { server } from '../api/server';
import { useErrorHandler } from './use-error-handler';

const Context = createContext();

export const useAuth = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [user, setUser] = useState();
    const { handler } = useErrorHandler();

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
    const signOut = () => {
        setUser(undefined);
        localStorage.removeItem('@course:auth');
    };

    const loadUserFromStorage = () => {
        const auth = JSON.parse(localStorage.getItem('@course:auth'));

        setUser(auth);
    };

    return (
        <Context.Provider
            value={{ user, signIn, signOut, loadUserFromStorage }}
        >
            {children}
        </Context.Provider>
    );
};
