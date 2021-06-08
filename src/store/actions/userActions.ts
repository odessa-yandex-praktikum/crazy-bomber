import {Dispatch} from 'redux';
import {apiSignIn, apiSignUp, Data} from '../../services/api';
import {AuthenticationActionTypes, RegistrationActionTypes, User} from '../types/user';

export const userActions = {
    register,
    login,
    logout,
};

function register(formData: Data) {
    return (dispatch: Dispatch) => {
        dispatch(request());

        apiSignUp(formData)
            .then(() => {
                dispatch(success());
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function request() {
        return {type: RegistrationActionTypes.REGIST_REQUEST};
    }

    function success() {
        return {type: RegistrationActionTypes.REGISTER_SUCCESS};
    }

    function failure(error: string) {
        return {type: RegistrationActionTypes.REGISTER_FAILURE, error};
    }
}

function login(formData: Data) {
    return (dispatch: Dispatch) => {
        dispatch(request());

        apiSignIn(formData)
            .then(() => {
                const user = {
                    id: 402,
                    img: 'https://freesvg.org/img/1514826571.png',
                    email: 'vasia@mail.ru',
                    login: 'Vasia001',
                    name: 'Vasia',
                    password: 'testtest',
                    score: 123,
                };
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function request() {
        return {
            type: AuthenticationActionTypes.LOGIN_REQUEST,
            loggingIn: false,
            currentUser: null,
            error: null,
        };
    }

    function success(user: User) {
        return {type: AuthenticationActionTypes.LOGIN_SUCCESS, user};
    }

    function failure(error: string) {
        return {type: AuthenticationActionTypes.LOGIN_FAILURE, error};
    }
}

function logout() {
    localStorage.removeItem('user');
    return {type: AuthenticationActionTypes.LOGOUT};
}
