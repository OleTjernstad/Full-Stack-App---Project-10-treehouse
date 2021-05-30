import { CourseForm, initialState, reducer } from '../components/course-form';
import { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Link } from 'react-router-dom';
import { server } from '../api/server';

export const UpdateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const { id } = useParams();

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const get = async () => {
            const { status, data } = await server.get(`api/courses/${id}`);
            if (status === 200) {
                dispatch({ type: 'setCourse', payload: data.course });
            }
        };
        get();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await server.put(`/api/courses/${id}`, {
                ...state
            });
            if (status === 204) {
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
