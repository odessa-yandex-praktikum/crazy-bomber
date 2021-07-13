export interface UserThemeData {
    user_id: number;
    theme_id: number;
}

const url = 'http://localhost:3000';

const apiHost = {
    getUserTheme: '/get-user-theme',
    getTheme: '/get-theme',
    writeUserTheme: '/write-user-theme',
    updateUserTheme: '/update-user-theme',
};

export function getUserTheme(userID: number): Promise<any> {
    return fetch(url + apiHost.getUserTheme + '?user_id=' + userID, {
        method: 'GET',
        credentials: 'include',
        headers: {
            accept: 'application/json',
        },
    }).then((r: Response) => r.json());
}

export function getThemeById(themeID: number): Promise<any> {
    return fetch(url + apiHost.getTheme + '?id=' + themeID, {
        method: 'GET',
        credentials: 'include',
        headers: {
            accept: 'application/json',
        },
    }).then((r: Response) => r.json());
}

export function getIDByTheme(theme: string): Promise<any> {
    return fetch(url + apiHost.getTheme + '?theme=' + theme, {
        method: 'GET',
        credentials: 'include',
        headers: {
            accept: 'application/json',
        },
    }).then((r: Response) => r.json());
}

export function writeUserTheme(formData: UserThemeData): Promise<Response> {
    return fetch(url + apiHost.writeUserTheme, {
        method: 'POST',
        credentials: 'include',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: formData.user_id,
            theme_id: formData.theme_id,
        }),
    });
}

export function updateUserTheme(formData: UserThemeData): Promise<Response> {
    return fetch(url + apiHost.updateUserTheme, {
        method: 'POST',
        credentials: 'include',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: formData.user_id,
            theme_id: formData.theme_id,
        }),
    });
}
