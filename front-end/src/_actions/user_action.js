import { CustomAxios } from '../lib/CustomAxios';
import { AUTH_API_URL } from '../components/Config';
import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER
} from './types';

export async function loginUser(dataToSubmit) {
    const request = await CustomAxios.post(`${AUTH_API_URL}/login`, dataToSubmit)
                         .then(response => response.data);
    
    return {
        type: LOGIN_USER,
        payload: request
    }
};

export async function signupUser(dataToSubmit) {
    const request = await CustomAxios.post(`${AUTH_API_URL}/signUp`, dataToSubmit)
                         .then(response => response.data);

    return {
        type: SIGNUP_USER,
        payload: request
    }
};

export async function auth() {
    const request = await CustomAxios.get(`${AUTH_API_URL}/auth`)
                         .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
};