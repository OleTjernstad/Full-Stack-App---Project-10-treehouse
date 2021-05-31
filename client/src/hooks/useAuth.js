import { createContext, useContext, useState } from 'react';

import { server } from '../api/server';

const Context = createContext();

export const useAuth = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [user, setUser] = useState();

    const signIn = async (emailAddress, password) => {
        const auth = {
            username: emailAddress,
            password: password
        };
        console.log(auth, 'useAuth signin');
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

        return false;
    };
    const signOut = () => {
        setUser(undefined);
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
