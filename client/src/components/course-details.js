import { Link } from 'react-router-dom';

export const ActionBar = () => {
    return (
        <div className="actions--bar">
            <div className="wrap">
                <a className="button" href="update-course.html">
                    Update Course
                </a>
                <a className="button" href="#">
                    Delete Course
                </a>
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
