import { CourseForm, initialState, reducer } from '../components/course-form';
import { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Link } from 'react-router-dom';
import { server } from '../api/server';
import { useErrorHandler } from '../hooks/use-error-handler';

export const UpdateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const { id } = useParams();

    const { errors, handler } = useErrorHandler();

    useEffect(() => {
        const get = async () => {
            try {
                const { status, data } = await server.get(`api/courses/${id}`);
                if (status === 200) {
                    dispatch({ type: 'setCourse', payload: data.course });
                }
            } catch (error) {
                handler(error);
            }
        };
        get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
