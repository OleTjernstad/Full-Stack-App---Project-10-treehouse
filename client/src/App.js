import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { Provider as AuthProvider } from './hooks/useAuth';
import { CourseDetails } from './views/course-detail';
import { Courses } from './views/courses';
import { CreateCourse } from './views/create-course';
import { Forbidden } from './views/forbidden';
import { Header } from './layout/header';
import { NotFound } from './views/not-found';
import { PrivateRoute } from './routes/privateRoute';
import { UpdateCourse } from './views/update-course';
import { UserSignOut } from './views/user-sign-out';
import { UserSignUp } from './views/user-sign-up';
import { UserSignin } from './views/user-signIn';

function App() {
    return (
        <AuthProvider>
            <Router>
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
                        <Route>
                            <Redirect to="/notfound" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
