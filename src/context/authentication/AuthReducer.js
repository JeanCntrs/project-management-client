import {
    SUCCESSFUL_REGISTRATION,
    REGISTRATION_ERROR,
    GET_USER,
    SUCCESSFUL_LOGIN,
    LOGIN_ERROR,
    SIGN_OFF
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_REGISTRATION:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null
            }
        case LOGIN_ERROR:
        case REGISTRATION_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                message: action.payload
            }
        default:
            return state;
    }
}