import {History, LocationState} from 'history';
import {Dispatch} from 'redux';
import {
    getIDByTheme,
    getThemeById,
    getUserTheme,
    updateUserTheme,
    writeUserTheme,
} from '../../services/api/theme-api';
import {
    apiChangePassword,
    apiChangeProfile,
    apiChangeProfileAvatar,
    apiLogout,
    apiSignIn,
    apiSignUp,
    Data,
    getUserInfo,
} from '../../services/api/user-api';
import {Nullable, User, UserActionTypes, UserData} from '../types/user';

export const userActions = {
    getUser,
    register,
    login,
    changeProfile,
    changePassword,
    changeAvatar,
    logout,
    changeTheme,
};

function register(formData: Data, history: History<LocationState>) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        apiSignUp(formData)
            .catch((error: Error) => {
                throw error;
            })
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                };
                dispatch(success(user));
                return user;
            })
            .then((user) => getUserThemeById(user.id, dispatch))
            .then(() => {
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

function getUser(history: History<LocationState>): (dispatch: Dispatch) => void {
    return (dispatch: Dispatch) => {
        dispatch(request());

        getUserInfo()
            .catch((error: Error) => {
                throw error;
            })
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: data.avatar ? data.avatar : 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                };
                dispatch(success(user));
                return user;
            })
            .then((user) => getUserThemeById(user.id, dispatch))
            .then(() => {
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
            .then((data: UserData) => {
                const user = {
                    id: data.id,
                    avatar: data.avatar ? data.avatar : 'https://freesvg.org/img/1514826571.png',
                    name: data.first_name,
                    login: data.login,
                    email: data.email,
                };
                dispatch(success(user));
                return user;
            })
            .then((user) => getUserThemeById(user.id, dispatch))
            .then(() => {
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
    return {type: UserActionTypes.LOGOUT};
}

function changeTheme(clickTheme: string, id: number) {
    return (dispatch: Dispatch) => {
        getIDByTheme(clickTheme)
            .then((newTheme: {id: number; theme: string}) => {
                getUserTheme(id)
                    .then((oldThemeID: {theme_id: number; user_id: number}) => {
                        if (oldThemeID.theme_id !== newTheme.id) {
                            updateUserTheme({user_id: id, theme_id: newTheme.id}).catch((err) => {
                                Error(err);
                            });
                            dispatch(success(newTheme.theme));
                        }
                    })
                    .catch(() => {
                        writeUserTheme({user_id: id, theme_id: newTheme.id}).catch((err) => {
                            Error(err);
                        });
                        dispatch(success(newTheme.theme));
                    });
            })
            .catch((error: Error) => {
                dispatch(failure(error.message));
                console.log(error);
            });
    };

    function success(theme: Nullable<string>) {
        return {
            type: UserActionTypes.USER_SET_THEME_SUCCESS,
            theme: theme,
        };
    }

    function failure(error: string) {
        return {
            type: UserActionTypes.USER_SET_THEME_FAILURE,
            error: error,
        };
    }
}

function getUserThemeById(UserId: number, dispatch: Dispatch) {
    return getUserTheme(UserId).then((ThemeId: {theme_id: number; id: number; user_id: number}) => {
        getThemeById(ThemeId.theme_id)
            .then((Theme: {id: number; theme: string}) => {
                dispatch({
                    type: UserActionTypes.USER_SET_THEME_SUCCESS,
                    theme: Theme.theme,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
