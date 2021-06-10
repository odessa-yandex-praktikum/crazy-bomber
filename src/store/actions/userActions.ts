import {Dispatch} from 'redux';
import {apiSignIn, apiSignUp, apiLogout, Data} from '../../services/api';
import {UserActionTypes, User, UserData} from '../types/user';

export const userActions = {
    register,
    login,
    logout,
};

function register(formData: Data) {
    return (dispatch: Dispatch) => {
        dispatch(request());

        apiSignUp(formData)
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
                throw error;
            })
            .then((r: Response) => r.json())
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                    score: Math.floor(Math.random() * (999 - 100)),
                };
                console.log('user', user);
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
                throw error;
            });
    };

    function request() {
        return {
            type: UserActionTypes.USER_ACTION_REQUEST,
            loggingIn: false,
            currentUser: null,
            error: '',
        };
    }

    function success(user: User) {
        return {
            type: UserActionTypes.USER_ACTION_SUCCESS,
            loggingIn: true,
            currentUser: user,
            error: '',
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_ACTION_FAILURE,
            loggingIn: false,
            currentUser: null,
            error: error,
        };
    }
}

function login(formData: Data) {
    return (dispatch: Dispatch) => {
        dispatch(request());

        apiSignIn(formData)
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
                throw error;
            })
            .then((r: Response) => r.json())
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                    score: Math.floor(Math.random() * (999 - 100)),
                };
                console.log('user', user);
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
                throw error;
            });
    };

    function request() {
        return {
            type: UserActionTypes.USER_ACTION_REQUEST,
            loggingIn: false,
            currentUser: null,
            error: '',
        };
    }

    function success(user: User) {
        return {
            type: UserActionTypes.USER_ACTION_SUCCESS,
            loggingIn: true,
            currentUser: user,
            error: '',
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_ACTION_FAILURE,
            loggingIn: false,
            currentUser: null,
            error: error,
        };
    }
}

function logout() {
    void apiLogout();
    localStorage.removeItem('user');
    return {type: UserActionTypes.LOGOUT};
}
