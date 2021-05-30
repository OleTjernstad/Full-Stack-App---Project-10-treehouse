import { Link } from 'react-router-dom';
import { server } from '../api/server';

export const ActionBar = ({ id }) => {
    const handleDelete = async () => {
        const response = await server.delete(`api/courses/${id}`);
        console.log(response);
    };
    return (
        <div className="actions--bar">
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
        </div>
    );
};

export const Description = ({ course: { title, User, description } }) => {
    return (
        <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{title}</h4>
            <p>
                By {User.firstName} {User.lastName}
            </p>

            {description}
        </div>
    );
};

export const Detail = ({ course: { estimatedTime, materialsNeeded } }) => {
    return (
        <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{estimatedTime}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">{materialsNeeded}</ul>
        </div>
    );
};
