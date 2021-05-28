import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider as AuthProvider } from './hooks/useAuth';
import { Header } from './layout/header';
import { PrivateRoute } from './routes/privateRoute';
import { UserSignin } from './views/user-signIn';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route path="/signin">
                            <UserSignin />
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
