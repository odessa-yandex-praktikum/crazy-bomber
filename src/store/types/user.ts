export type Nullable<T> = T | null;

export interface User {
    id: number;
    img: string;
    email: string;
    login: string;
    name: string;
    password: string;
    score: number;
}

export interface RegistrationState {
    registering: boolean;
    error: Nullable<string>;
}

export enum RegistrationActionTypes {
    REGIST_REQUEST = 'REGISTER_REQUEST',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',
}

export type RegistrationAction = {
    type: string;
    registering: boolean;
    error: Nullable<string>;
};

export interface AuthenticationState {
    loggingIn: boolean;
    currentUser: Nullable<User>;
    error: Nullable<string>;
}

export enum AuthenticationActionTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT',
}

export type AuthenticationAction = {
    type: string;
    loggingIn: boolean;
    currentUser: Nullable<User>;
    error: Nullable<string>;
};
