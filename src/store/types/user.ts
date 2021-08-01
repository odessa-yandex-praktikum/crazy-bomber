export type Nullable<T> = T | null;

export interface UserData {
    id: number;
    avatar: string | null;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    theme: string | undefined;
}

export interface User {
    id: number;
    avatar: string;
    name: string;
    login: string;
    email: string;
}

export interface UserState {
    loggedIn: boolean;
    currentUser: Nullable<User>;
    theme: string | undefined;
    error: Nullable<string>;
}

export enum UserActionTypes {
    USER_AUTH_REQUEST = 'USER_AUTH_REQUEST',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE = 'USER_AUTH_FAILURE',
    USER_CHANGE_PROFILE_SUCCESS = 'USER_CHANGE_PROFILE_SUCCESS',
    USER_CHANGE_PROFILE_FAILURE = 'USER_CHANGE_PROFILE_FAILURE',
    USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS',
    USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE',
    USER_CHANGE_AVATAR_SUCCESS = 'USER_CHANGE_AVATAR_SUCCESS',
    USER_CHANGE_AVATAR_FAILURE = 'USER_CHANGE_AVATAR_FAILURE',
    LOGOUT = 'LOGOUT',
    USER_SET_THEME_SUCCESS = 'USER_SET_THEME_SUCCESS',
    USER_SET_THEME_FAILURE = 'USER_SET_THEME_FAILURE',
}

export type UserAction = {
    type: string;
    loggingIn: boolean;
    currentUser: Nullable<User>;
    theme: string | undefined;
    error: Nullable<string>;
};
