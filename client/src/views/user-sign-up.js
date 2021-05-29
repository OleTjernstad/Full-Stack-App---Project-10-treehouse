import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';

import { server } from '../api/server';

export const UserSignUp = () => {
    const history = useHistory();

    const firstName = useRef();
    const lastName = useRef();
    const emailAddress = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const [errors, setErrors] = useState([]);

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
                if (error.response.status === 400) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>

                {errors.length > 0 ? (
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
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
                    <button
                        onClick={() => history.replace('/')}
                        className="button button-secondary"
                    >
                        Cancel
                    </button>
                </form>
                <p>
                    Already have a user account? Click here to{' '}
                    <Link to="/signin">Sign In</Link>!
                </p>
            </div>
        </main>
    );
};
