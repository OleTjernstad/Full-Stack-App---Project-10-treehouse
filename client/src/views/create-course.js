import { CourseForm, initialState, reducer } from '../components/course-form';

import { server } from '../api/server';
import { useAuth } from '../hooks/useAuth';
import { useErrorHandler } from '../hooks/use-error-handler';
import { useHistory } from 'react-router-dom';
import { useReducer } from 'react';

export const CreateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const history = useHistory();
    const { user } = useAuth();
    const { errors, handler } = useErrorHandler();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await server.post('api/courses', {
                ...state,
                userId: user.id
            });
            if (status === 201) {
                history.replace('/');
            }
        } catch (error) {
            handler(error);
        }
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
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
                        Create Course
                    </button>
                    <button className="button button-secondary">Cancel</button>
                </form>
            </div>
        </main>
    );
};
