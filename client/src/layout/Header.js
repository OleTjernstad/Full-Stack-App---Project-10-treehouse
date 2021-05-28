import { useAuth } from '../hooks/useAuth';

export const Header = () => {
    const { user } = useAuth();

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <a href="index.html">Courses</a>
                </h1>
                <nav>
                    {user ? (
                        <ul className="header--signedin">
                            <li>
                                Welcome, {user.firstName} {user.lastName}!
                            </li>
                            <li>
                                <a href="sign-out.html">Sign Out</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="header--signedout">
                            <li>
                                <a href="sign-up.html">Sign Up</a>
                            </li>
                            <li>
                                <a href="sign-in.html">Sign In</a>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};
