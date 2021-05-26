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
    changePasswordRequest: 'user/password',
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
