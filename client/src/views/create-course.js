import { CourseForm, initialState, reducer } from '../components/course-form';

import { server } from '../api/server';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useReducer } from 'react';

export const CreateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { status } = await server.post('api/courses', {
            ...state,
            userId: user.id
        });
        if (status === 201) {
            history.replace('/');
        }
    };
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
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
