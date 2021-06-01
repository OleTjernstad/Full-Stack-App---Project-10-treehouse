import { Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

/**
 * Sign out the user
 * @returns
 */
export const UserSignOut = () => {
    const { signOut } = useAuth();
    useEffect(() => {
        signOut();
    });

    return <Redirect to="/" />;
};
