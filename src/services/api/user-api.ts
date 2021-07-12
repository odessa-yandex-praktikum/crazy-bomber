import {processingRequest} from './common';

export interface Data {
    avatar?: string;
    name?: string;
    login?: string;
    email?: string;
    newPassword?: string;
    phone?: string;
    password?: string;
    title?: string;
    display_name?: string;
    oldPassword?: string;
    second_name?: string;
}

const url = 'https://ya-praktikum.tech/api/v2/';
const apiHost = {
    signUp: 'auth/signup',
    signIn: 'auth/signin',
    getUserInfo: 'auth/user',
    logout: 'auth/logout',
    changeUserProfile: 'user/profile',
    changeUserAvatar: 'user/profile/avatar',
    changePassword: 'user/password',
};

export function apiSignUp(formData: Data): Promise<Response> {
    return fetch(url + apiHost.signUp, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            first_name: formData.name,
            second_name: formData.name,
            login: formData.login,
            email: formData.email,
            phone: '1111111',
            password: formData.newPassword,
        }),
    }).then(getUserInfo);
}

export function apiSignIn(formData: Data): Promise<Response> {
    return fetch(url + apiHost.signIn, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            login: formData.login,
            password: formData.password,
        }),
    }).then(getUserInfo);
}

export function apiLogout(): Promise<Response> {
    return fetch(url + apiHost.logout, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
    }).then((response) => processingRequest(response));
}

export function getUserInfo(): Promise<Response> {
    return fetch(url + apiHost.getUserInfo, {
        method: 'GET',
        credentials: 'include',

        headers: {
            accept: 'application/json',
        },
    }).then((response) => processingRequest(response));
}

export function apiChangeProfile(formData: Data): Promise<Response> {
    return fetch(url + apiHost.changeUserProfile, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            first_name: formData.name,
            second_name: formData.name,
            //display_name: formData.name.concat(' ').concat(formData.name),
            display_name: formData.name,
            login: formData.login,
            email: formData.email,
            phone: '1111111',
        }),
    }).then((response) => processingRequest(response));
}

export function apiChangeProfileAvatar(formData: FormData): Promise<Response> {
    return fetch(url + apiHost.changeUserAvatar, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: formData,
    }).then((response) => processingRequest(response));
}

export function apiChangePassword(formData: Data): Promise<Response> {
    return fetch(url + apiHost.changePassword, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        }),
    }).then((response) => processingRequest(response));
}
