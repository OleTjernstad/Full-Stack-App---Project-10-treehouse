import React, { useRef } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router';

export const UserSignin = () => {
    const { signIn } = useAuth();
    const email = useRef();
    const password = useRef();
    const history = useHistory();

    const handleSignin = async (e) => {
        e.preventDefault();
        if (await signIn(email.current.value, password.current.value)) {
            history.replace('/');
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
