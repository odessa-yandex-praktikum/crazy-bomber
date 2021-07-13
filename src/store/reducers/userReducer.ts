import {UserActionTypes, Nullable, User, UserState, UserAction} from '../types/user';

const currentUser: Nullable<User> = null; // TODO. Добавить middleware на сервере для проверки пользователя.
export const initialState: UserState = currentUser
    ? {
          loggedIn: true,
          currentUser: currentUser,
          error: '',
          theme: '',
      }
    : {
          loggedIn: false,
          currentUser: null,
          error: '',
          theme: '',
      };

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.USER_AUTH_REQUEST:
            return {loggedIn: false, currentUser: null, error: '', theme: null};
        case UserActionTypes.USER_AUTH_SUCCESS:
            return {
                loggedIn: true,
                currentUser: action.currentUser,
                error: '',
                theme: action.theme,
            };
        case UserActionTypes.USER_AUTH_FAILURE:
            return {loggedIn: false, currentUser: null, error: action.error, theme: null};
        case UserActionTypes.USER_CHANGE_PROFILE_SUCCESS:
            return {...state, currentUser: action.currentUser};
        case UserActionTypes.USER_CHANGE_PROFILE_FAILURE:
            return {...state, error: action.error};
        case UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS:
            return state;
        case UserActionTypes.USER_CHANGE_PASSWORD_FAILURE:
            return {...state, error: action.error};
        case UserActionTypes.USER_CHANGE_AVATAR_SUCCESS:
            return {...state, currentUser: action.currentUser};
        case UserActionTypes.USER_CHANGE_AVATAR_FAILURE:
            return {...state, error: action.error};
        case UserActionTypes.LOGOUT:
            return {loggedIn: false, currentUser: null, error: '', theme: null};
        case UserActionTypes.USER_CHANGE_THEME_SUCCESS:
            return {...state, theme: action.theme};
        case UserActionTypes.USER_CHANGE_THEME_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};
