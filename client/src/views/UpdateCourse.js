import { CourseForm, initialState, reducer } from '../components/course-form';
import { useHistory, useParams } from 'react-router';

import { Link } from 'react-router-dom';
import { server } from '../api/server';
import { useAsyncLoader } from '../hooks/use-async-loader';
import { useAuth } from '../hooks/use-auth';
import { useErrorHandler } from '../hooks/use-error-handler';
import { useReducer } from 'react';

/**
 * Render Update course page
 *
 * @returns
 */
export const UpdateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const { id } = useParams();

    const { user } = useAuth();

    const { errors, handler } = useErrorHandler();

    /**
     * Load course details by id from api
     */
    useAsyncLoader(id, server.get(`api/courses/${id}`), (data, status) => {
        if (status === 200) {
            if (user.id !== data.course.User.id) {
                history.replace('forbidden');
            }
            dispatch({ type: 'setCourse', payload: data.course });
        }
    });

    /**
     * Submit the updated course to the api
     * @param {Event} e Submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await server.put(`/api/courses/${id}`, {
                ...state
            });
            if (status === 204) {
                history.replace(`/courses/${id}`);
            }
        } catch (error) {
            handler(error);
        }
    };

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
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
                <form onSubmit={handleSubmit}>
                    <CourseForm course={state} dispatch={dispatch} />
                    <button className="button" type="submit">
                        Update Course
                    </button>
                    <Link
                        className="button button-secondary"
                        to={`/courses/${id}`}
                    >
                        Cancel
                    </Link>
                </form>
            </div>
        </main>
    );
};
