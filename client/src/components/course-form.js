/**
 * Render the course form for create and update the course
 * @param {props} course The course object, dispatch: the function to set state
 * @returns
 */
export const CourseForm = ({
    course: { title, User, description, estimatedTime, materialsNeeded },
    dispatch
}) => {
    return (
        <div className="main--flex">
            <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    value={title}
                    onChange={(e) =>
                        dispatch({ type: 'setTitle', payload: e.target.value })
                    }
                />

                <p>
                    By {User.firstName} {User.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                    id="courseDescription"
                    name="courseDescription"
                    value={description}
                    onChange={(e) =>
                        dispatch({
                            type: 'setDescription',
                            payload: e.target.value
                        })
                    }
                ></textarea>
            </div>
            <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={(e) =>
                        dispatch({
                            type: 'setEstimatedTime',
                            payload: e.target.value
                        })
                    }
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={materialsNeeded}
                    onChange={(e) =>
                        dispatch({
                            type: 'SetMaterialsNeeded',
                            payload: e.target.value
                        })
                    }
                ></textarea>
            </div>
        </div>
    );
};

/**
 * The initial state for the useReducer
 */
export const initialState = {
    id: 0,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    User: {}
};

/**
 * The reducer function to set the course state
 *
 * @param {object} state the object containing the state
 * @param {object} action type and payload to run correct setState
 * @returns state
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case 'setId':
            return { ...state, id: action.payload };
        case 'setTitle':
            return { ...state, title: action.payload };
        case 'setDescription':
            return { ...state, description: action.payload };
        case 'setEstimatedTime':
            return { ...state, estimatedTime: action.payload };
        case 'SetMaterialsNeeded':
            return { ...state, materialsNeeded: action.payload };
        case 'setCourse':
            return action.payload;
        default:
            throw new Error();
    }
};
