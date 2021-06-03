import { Link, useHistory } from 'react-router-dom';

import { server } from '../api/server';
import { useErrorHandler } from '../hooks/use-error-handler';
import { useRef } from 'react';

/**
 * Render User signup page
 * @returns
 */
export const UserSignUp = () => {
    const history = useHistory();

    /**
     * Refs for handling input data
     */
    const firstName = useRef();
    const lastName = useRef();
    const emailAddress = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const { errors, handler } = useErrorHandler();

    /**
     * Submit user data to the api
     * @param {Event} e Submit event
     */
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password.current.value === confirmPassword.current.value) {
            try {
                const { status } = await server.post('api/users', {
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    emailAddress: emailAddress.current.value,
                    password: password.current.value
                });
                if (status === 201) {
                    history.replace('/signin');
                }
            } catch (error) {
                handler(error);
            }
        }
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>

                {errors.length > 0 ? (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                ) : undefined}

                <form onSubmit={handleSignUp}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        ref={firstName}
                        id="firstName"
                        name="firstName"
                        type="text"
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        ref={lastName}
                        id="lastName"
                        name="lastName"
                        type="text"
                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        ref={emailAddress}
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        ref={confirmPassword}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                    />
                    <button className="button" type="submit">
                        Sign Up
                    </button>
                    <Link className="button button-secondary" to="/">
                        Cancel
                    </Link>
                </form>
                <p>
                    Already have a user account? Click here to{' '}
                    <Link to="/signin">Sign In</Link>!
                </p>
            </div>
        </main>
    );
};
