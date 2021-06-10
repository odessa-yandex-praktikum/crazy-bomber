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
    avatar: string | null;
    name: string;
    login: string;
    email: string;
    score: number;
}

export interface UserState {
    loggingIn: boolean;
    currentUser: Nullable<User>;
    error: Nullable<string>;
}

export enum UserActionTypes {
    USER_ACTION_REQUEST = 'USER_ACTION_REQUEST',
    USER_ACTION_SUCCESS = 'USER_ACTION_SUCCESS',
    USER_ACTION_FAILURE = 'USER_ACTION_FAILURE',
    LOGOUT = 'LOGOUT',
}

export type UserAction = {
    type: string;
    loggingIn: boolean;
    currentUser: Nullable<User>;
    error: Nullable<string>;
};
