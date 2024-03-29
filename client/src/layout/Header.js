import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useEffectOnce } from '../hooks/use-effect-once';

/**
 * Render the Page header, Show header buttons based on logged in status, call loadUserFromStorage on reload
 *
 * @returns
 */
export const Header = () => {
    const { user, loadUserFromStorage } = useAuth();

    useEffectOnce(() => {
        if (!user) {
            loadUserFromStorage();
        }
    });

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to="/">Courses</Link>
                </h1>
                <nav>
                    {user ? (
                        <ul className="header--signedin">
                            <li>
                                Welcome, {user.firstName} {user.lastName}!
                            </li>
                            <li>
                                <Link to="/signout">Sign Out</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="header--signedout">
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};
