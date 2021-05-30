import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ children, ...props }) => {
    const { user } = useAuth();

    return (
        <Route
            {...props}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
