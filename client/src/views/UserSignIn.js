import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

/**
 * Render sign in page
 * @returns
 */
export const UserSignin = () => {
    const { signIn } = useAuth();
    const email = useRef();
    const password = useRef();
    const history = useHistory();
    const location = useLocation();

    /**
     * Submit sign in data to the api
     *
     * @param {Event} e Submit event
     */
    const handleSignin = async (e) => {
        e.preventDefault();
        const { from } = location.state || { from: { pathname: '/' } };
        if (await signIn(email.current.value, password.current.value)) {
            history.replace(from);
        }
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                <form onSubmit={handleSignin}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        ref={email}
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        ref={password}
                        id="password"
                        name="password"
                        type="password"
                    />
                    <button className="button" type="submit">
                        Sign In
                    </button>
                    <Link className="button button-secondary" to="/">
                        Cancel
                    </Link>
                </form>
                <p>
                    Don't have a user account? Click here to{' '}
                    <Link to="/signup">Sign Up</Link>!
                </p>
            </div>
        </main>
    );
};
