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

const processingRequest = (response: Response) => {
    if (response.status === 200) {
        return response;
    } else {
        return response.json().then((result: {reason: string}) => {
            throw Error(result?.reason);
        });
    }
};

export function apiSignUp(formData: Data): Promise<Response> {
    return fetch(url + apiHost.signUp, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
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
    }).then(() => getUserInfo());
}

export function apiSignIn(formData: Data): Promise<Response> {
    return fetch(url + apiHost.signIn, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            login: formData.login,
            password: formData.password,
        }),
    }).then(() => getUserInfo());
}

export async function apiLogout(): Promise<Response> {
    const response = await fetch(url + apiHost.logout, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    });
    return processingRequest(response);
}

function getUserInfo(): Promise<Response> {
    return fetch(url + apiHost.getUserInfo, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            accept: 'application/json',
        },
    }).then((response) => processingRequest(response));
}

export function changeUserProfile(formData: Data): Promise<Response> {
    return fetch(url + apiHost.changeUserProfile, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
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
    }).then((response) => processingRequest(response));
}

export function changePassword(formData: Data): Promise<Response> {
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
