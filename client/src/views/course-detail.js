import { ActionBar, Description, Detail } from '../components/course-details';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { server } from '../api/server';

export const CourseDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [course, setCourse] = useState();

    useEffect(() => {
        const get = async () => {
            try {
                const { status, data } = await server.get(`api/courses/${id}`);
                if (status === 200) {
                    setCourse(data.course);
                    console.log(data.course);
                }
            } catch (error) {
                if (error.response.status === 404) {
                    history.push('/notfound');
                } else {
                }
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
