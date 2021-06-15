import {History, LocationState} from 'history';
import {Dispatch} from 'redux';
import {
    apiSignIn,
    apiSignUp,
    apiLogout,
    Data,
    apiChangeProfile,
    apiChangePassword,
    apiChangeProfileAvatar,
} from '../../services/api/user-api';
import {UserActionTypes, User, UserData} from '../types/user';

export const userActions = {
    register,
    login,
    changeProfile,
    changePassword,
    changeAvatar,
    logout,
};

function register(formData: Data, history: History<LocationState>) {
    return (dispatch: Dispatch) => {
        dispatch(request());

        apiSignUp(formData)
            .catch((error: Error) => {
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
                };
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
                history.push('start');
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function request() {
        return {
            type: UserActionTypes.USER_AUTH_REQUEST,
        };
    }

    function success(user: User) {
        return {
            type: UserActionTypes.USER_AUTH_SUCCESS,
            loggingIn: true,
            currentUser: user,
            error: '',
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_AUTH_FAILURE,
            loggingIn: false,
            currentUser: null,
            error: error,
        };
    }
}

function login(formData: Data, history: History<LocationState>) {
    return (dispatch: Dispatch) => {
        dispatch(request());

        apiSignIn(formData)
            .catch((error: Error) => {
                throw error;
            })
            .then((r: Response) => r.json())
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: data.avatar ? data.avatar : 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                };
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
                history.push('start');
            })
            .catch((error: Error) => {
                dispatch(
                    failure(
                        error.message === 'Cookie is not valid'
                            ? 'Login or password is incorrect'
                            : error.message
                    )
                );
                console.log(error);
            });
    };

    function request() {
        return {
            type: UserActionTypes.USER_AUTH_REQUEST,
        };
    }

    function success(user: User) {
        return {
            type: UserActionTypes.USER_AUTH_SUCCESS,
            loggingIn: true,
            currentUser: user,
            error: '',
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_AUTH_FAILURE,
            loggingIn: false,
            currentUser: null,
            error: error,
        };
    }
}

function changeProfile(formData: Data) {
    return (dispatch: Dispatch) => {
        apiChangeProfile(formData)
            .then((r: Response) => r.json())
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: data.avatar ? data.avatar : 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                };
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function success(user: User) {
        return {
            type: UserActionTypes.USER_CHANGE_PROFILE_SUCCESS,
            currentUser: user,
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_CHANGE_PROFILE_FAILURE,
            error: error,
        };
    }
}

function changePassword(formData: Data) {
    return (dispatch: Dispatch) => {
        apiChangePassword(formData)
            .then(() => {
                dispatch(success());
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function success() {
        return {
            type: UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS,
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_CHANGE_PROFILE_FAILURE,
            error: error,
        };
    }
}

function changeAvatar(formData: FormData) {
    return (dispatch: Dispatch) => {
        apiChangeProfileAvatar(formData)
            .then((r: Response) => r.json())
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: data.avatar ? data.avatar : 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                };
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function success(user: User) {
        return {
            type: UserActionTypes.USER_CHANGE_AVATAR_SUCCESS,
            currentUser: user,
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_CHANGE_AVATAR_FAILURE,
            error: error,
        };
    }
}

function logout() {
    void apiLogout();
    localStorage.removeItem('user');
    return {type: UserActionTypes.LOGOUT};
}
