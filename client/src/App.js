import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider as AuthProvider } from './hooks/useAuth';
import { Courses } from './views/courses';
import { Header } from './layout/header';
import { PrivateRoute } from './routes/privateRoute';
import { UserSignOut } from './views/user-sign-out';
import { UserSignin } from './views/user-signIn';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Courses />
                        </Route>
                        <Route path="/signin">
                            <UserSignin />
                        </Route>
                        <Route path="/signout">
                            <UserSignOut />
                        </Route>
                        <PrivateRoute path="/courses">
                            <UserSignin />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
