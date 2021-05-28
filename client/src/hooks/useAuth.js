import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useAuth = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [user, setUser] = useState();

    const signIn = () => {
        setUser();
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
