export interface Data {
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
    });
}

export function apiSignIn(formData: Data): Promise<Response> {
    return fetch(url + apiHost.signIn, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            login: formData.login,
            password: formData.password,
        }),
    });
}

export function getUserInfo(): Promise<Response> {
    return fetch(url + apiHost.getUserInfo, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        credentials: 'include',
    });
}

export function changeUserProfile(formData: Data): Promise<Response> {
    return fetch(url + apiHost.changeUserProfile, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            first_name: formData.name,
            second_name: formData.name,
            display_name: formData.name,
            login: formData.login,
            email: formData.email,
            phone: '1111111',
        }),
        credentials: 'include',
    });
}

export function changePassword(formData: Data): Promise<Response> {
    return fetch(url + apiHost.changePassword, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        }),
        credentials: 'include',
    });
}
