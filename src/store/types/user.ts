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
}

export interface User {
    id: number;
    avatar: string;
    name: string;
    login: string;
    email: string;
    score: number;
}

export interface UserState {
    loggedIn: boolean;
    currentUser: Nullable<User>;
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
    LOGOUT = 'LOGOUT',
}

export type UserAction = {
    type: string;
    loggingIn: boolean;
    currentUser: Nullable<User>;
    error: Nullable<string>;
};
