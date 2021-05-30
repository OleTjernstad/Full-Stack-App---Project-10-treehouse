import { CourseForm, initialState, reducer } from '../components/course-form';
import { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router';

import { server } from '../api/server';

export const UpdateCourse = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const { id } = useParams();

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
        const { status } = await server.put(`/api/courses/${id}`, {
            ...state
        });
        if (status === 204) {
            history.replace('/');
        }
    };
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <CourseForm course={state} dispatch={dispatch} />
                    <button className="button" type="submit">
                        Update Course
                    </button>
                    <button className="button button-secondary">Cancel</button>
                </form>
            </div>
        </main>
    );
};
