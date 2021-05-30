import { CourseForm, initialState, reducer } from '../components/course-form';
import { useReducer, useState } from 'react';

import { server } from '../api/server';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

export const CreateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const { user } = useAuth();

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
            if (error.response.status === 400) {
                setErrors(error.response.data.errors);
            }
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
