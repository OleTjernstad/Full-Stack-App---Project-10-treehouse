import { ActionBar, Description, Detail } from '../components/course-details';

export const CourseDetails = () => {
    return (
        <main>
            <ActionBar />

            <div className="wrap">
                <h2>Course Detail</h2>
                <div className="main--flex">
                    <Description />
                    <Detail />
                </div>
            </div>
        </main>
    );
};
