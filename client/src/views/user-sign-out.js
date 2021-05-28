import { Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export const UserSignOut = () => {
    const { signOut } = useAuth();
    useEffect(() => {
        signOut();
    });

    return <Redirect to="/" />;
};
