import {getFetchToJson} from './common';


export interface UserThemeData {
    user_id: number;
    theme_id: number;
}

const url =  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://odessa-crazyboomber-5.ya-praktikum.tech';

const apiHost = {
    getUserTheme: '/get-user-theme',
    getTheme: '/get-theme',
    writeUserTheme: '/write-user-theme',
    updateUserTheme: '/update-user-theme',
};

/**
 * Получаем Id темы user из таблицы UserTheme.
 */
export function getUserTheme(userID: number): Promise<{}> {
    return getFetchToJson(url + apiHost.getUserTheme + '?user_id=' + userID);
}

/**
 * Получаем название темы user из таблицы SiteTheme по id темы.
 */
export function getThemeById(themeID: number): Promise<{}> {
    return getFetchToJson(url + apiHost.getTheme + '?id=' + themeID);
}

/**
 * Получаем id темы user из таблицы SiteTheme по названию темы.
 */
export function getIDByTheme(theme: string): Promise<{}> {
    return getFetchToJson(url + apiHost.getTheme + '?theme=' + theme);
}

/**
 * Записываем id темы и id user в таблицу UserTheme.
 */
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

/**
 * Обновляем для user id темы в таблице UserTheme.
 */
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
