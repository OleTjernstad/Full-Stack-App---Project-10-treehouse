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

        const response = await server.get('api/users', {
            auth: auth
        });

        if (response.status === 200) {
            setUser(response.data.user);
            localStorage.setItem('@course:auth', JSON.stringify(auth));
            return true;
        }

        return false;
    };
    const signOut = () => {
        setUser(undefined);
    };

    return (
        <Context.Provider value={{ user, signIn, signOut }}>
            {children}
        </Context.Provider>
    );
};
