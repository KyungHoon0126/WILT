import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER
} from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case SIGNUP_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return { ...state, loginSuccess: action.payload }
        default:
            return state;
    }
};