import { ActionBar, Description, Detail } from '../components/course-details';

import { getCourseById } from '../api/server';
import { useAsyncLoader } from '../hooks/use-async-loader';
import { useParams } from 'react-router';
import { useState } from 'react';

/**
 * Render page with course details
 * @returns
 */
export const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState();

    /**
     * Load course by id from api
     */
    useAsyncLoader(getCourseById(id), (data, status) => {
        if (status === 200) {
            setCourse(data.course);
        }
    });

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
