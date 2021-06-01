import { ActionBar, Description, Detail } from '../components/course-details';
import { useEffect, useState } from 'react';

import { server } from '../api/server';
import { useErrorHandler } from '../hooks/use-error-handler';
import { useParams } from 'react-router';

/**
 * Render page with course details
 * @returns
 */
export const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState();

    const { handler } = useErrorHandler();

    /**
     * Load course by id from api
     */
    useEffect(() => {
        const get = async () => {
            try {
                const { status, data } = await server.get(`api/courses/${id}`);
                if (status === 200) {
                    setCourse(data.course);
                }
            } catch (error) {
                handler(error);
            }
        };
        get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <main>
            {course ? (
                <ActionBar id={course.id} owner={course.User} />
            ) : undefined}

            <div className="wrap">
                <h2>Course Detail</h2>

                {course !== undefined ? (
                    <div className="main--flex">
                        <Description course={course} />
                        <Detail course={course} />
                    </div>
                ) : undefined}
            </div>
        </main>
    );
};
