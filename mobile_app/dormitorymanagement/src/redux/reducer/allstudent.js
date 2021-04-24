import { actionType } from '../actionType';

const {GET_ALL_STUDENT, GET_ALL_STUDENT_SUCCESS, GET_ALL_STUDENT_FAIL} = actionType;
const initialState = {
    msg: '',
}
export const allstudent = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ALL_STUDENT_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_ALL_STUDENT_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
