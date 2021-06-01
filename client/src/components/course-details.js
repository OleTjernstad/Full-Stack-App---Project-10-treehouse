import { Link, useHistory } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import { server } from '../api/server';
import { useAuth } from '../hooks/use-auth';

/**
 * Render action buttons for course filter buttons based on owner
 *
 * @param {props} id: Course id, owner: course User object
 * @returns
 */
export const ActionBar = ({ id, owner }) => {
    const { user } = useAuth();
    const history = useHistory();

    const handleDelete = async () => {
        const { status } = await server.delete(`api/courses/${id}`);
        if (status === 204) {
            history.replace('/');
        }
    };

    return (
        <div className="actions--bar">
            {user && user.id === owner.id ? (
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>
                        Update Course
                    </Link>
                    <button className="button" onClick={handleDelete}>
                        Delete Course
                    </button>

                    <Link className="button button-secondary" to="/">
                        Return to List
                    </Link>
                </div>
            ) : (
                <div className="wrap">
                    <Link className="button button-secondary" to="/">
                        Return to List
                    </Link>
                </div>
            )}
        </div>
    );
};

/**
 * Render the description and title of the course, add markdown to description
 *
 * @param {props} course The course object
 * @returns
 */
export const Description = ({ course: { title, User, description } }) => {
    return (
        <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{title}</h4>
            <p>
                By {User.firstName} {User.lastName}
            </p>

            <ReactMarkdown>{description}</ReactMarkdown>
        </div>
    );
};

/**
 * Render the details part of the course, Add markdown to materiels
 * @param {props} course The Course object
 * @returns
 */
export const Detail = ({ course: { estimatedTime, materialsNeeded } }) => {
    return (
        <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{estimatedTime}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
                <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
            </ul>
        </div>
    );
};
