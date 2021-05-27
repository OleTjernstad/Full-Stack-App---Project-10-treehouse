import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Header } from './layout/header';
import { UserSignin } from './views/user-signIn';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/signin">
                        <UserSignin />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
