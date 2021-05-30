import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider as AuthProvider } from './hooks/useAuth';
import { CourseDetails } from './views/course-detail';
import { Courses } from './views/courses';
import { CreateCourse } from './views/create-course';
import { Header } from './layout/header';
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
                        <Route exact path="/">
                            <Courses />
                        </Route>
                        <Route exact path="/courses/:id(\d+)">
                            <CourseDetails />
                        </Route>
                        <Route path="/signup">
                            <UserSignUp />
                        </Route>
                        <Route path="/signin">
                            <UserSignin />
                        </Route>
                        <Route path="/signout">
                            <UserSignOut />
                        </Route>
                        <PrivateRoute path="/courses/create">
                            <CreateCourse />
                        </PrivateRoute>
                        <PrivateRoute path="/courses/:id/update">
                            <UpdateCourse />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
