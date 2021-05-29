import { ActionBar, Description, Detail } from '../components/course-details';
import { useEffect, useState } from 'react';

import { server } from '../api/server';
import { useParams } from 'react-router';

export const CourseDetails = () => {
    const { id } = useParams();

    const [course, setCourse] = useState();

    useEffect(() => {
        const get = async () => {
            const { status, data } = await server.get(`api/courses/${id}`);
            if (status === 200) {
                setCourse(data.course);
                console.log(data.course);
            }
        };
        get();
    }, [id]);

    return (
        <main>
            <ActionBar />

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
