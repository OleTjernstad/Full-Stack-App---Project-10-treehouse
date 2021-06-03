import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { Provider as AuthProvider } from './hooks/use-auth';
import { CourseDetails } from './views/CourseDetail';
import { Courses } from './views/Courses';
import { CreateCourse } from './views/CreateCourse';
import { Forbidden } from './views/Forbidden';
import { Header } from './layout/Header';
import { NotFound } from './views/NotFound';
import { PrivateRoute } from './routes/PrivateRoute';
import { UnhandledError } from './views/UnhandledError';
import { UpdateCourse } from './views/UpdateCourse';
import { UserSignOut } from './views/UserSignOut';
import { UserSignUp } from './views/UserSignUp';
import { UserSignin } from './views/UserSignIn';

/**
 * Render app and routes
 * @returns
 */
function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Header />
                    <Switch>
                        {/* Home Route show all courses */}
                        <Route exact path="/">
                            <Courses />
                        </Route>
                        {/* Sign in / Up and out routes */}
                        <Route path="/signup">
                            <UserSignUp />
                        </Route>
                        <Route path="/signin">
                            <UserSignin />
                        </Route>
                        <Route path="/signout">
                            <UserSignOut />
                        </Route>
                        {/* Course routes */}
                        <Route exact path="/courses/:id(\d+)">
                            <CourseDetails />
                        </Route>
                        {/* Private routes */}
                        <PrivateRoute path="/courses/create">
                            <CreateCourse />
                        </PrivateRoute>
                        <PrivateRoute path="/courses/:id/update">
                            <UpdateCourse />
                        </PrivateRoute>
                        {/* Error routes */}
                        <Route path="/forbidden">
                            <Forbidden />
                        </Route>
                        <Route path="/notfound">
                            <NotFound />
                        </Route>
                        <Route path="/error">
                            <UnhandledError />
                        </Route>
                        <Route>
                            <Redirect to="/notfound" />
                        </Route>
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
