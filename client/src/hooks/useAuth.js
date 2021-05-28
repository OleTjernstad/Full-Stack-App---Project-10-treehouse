import { createContext, useContext, useState } from 'react';

import { server } from '../api/server';

const Context = createContext();

export const useAuth = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [user, setUser] = useState();

    const signIn = async (username, password) => {
        const response = await server.get('api/users', {
            auth: {
                username,
                password
            }
        });
        if (response.status === 200) {
            setUser(response.data.user);
            return true;
        }

        return false;
    };
    const signOut = () => {
        setUser();
    };

    return (
        <Context.Provider value={{ user, signIn, signOut }}>
            {children}
        </Context.Provider>
    );
};
