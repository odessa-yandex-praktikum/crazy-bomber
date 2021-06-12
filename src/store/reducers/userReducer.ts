import {UserActionTypes, Nullable, User, UserState, UserAction} from '../types/user';

const currentUser: Nullable<User> = JSON.parse(<string>localStorage.getItem('user'));
const initialState: UserState = currentUser
    ? {
          loggedIn: true,
          currentUser: currentUser,
          error: '',
      }
    : {
          loggedIn: false,
          currentUser: null,
          error: '',
      };

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.USER_AUTH_REQUEST:
            return {loggedIn: false, currentUser: null, error: ''};
        case UserActionTypes.USER_AUTH_SUCCESS:
            return {loggedIn: true, currentUser: action.currentUser, error: ''};
        case UserActionTypes.USER_AUTH_FAILURE:
            return {loggedIn: false, currentUser: null, error: action.error};
        case UserActionTypes.USER_CHANGE_PROFILE_SUCCESS:
            return {...state, currentUser: action.currentUser};
        case UserActionTypes.USER_CHANGE_PROFILE_FAILURE:
            return {...state, error: action.error};
        case UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS:
            return {...state};
        case UserActionTypes.USER_CHANGE_PASSWORD_FAILURE:
            return {...state, error: action.error};
        case UserActionTypes.LOGOUT:
            return {loggedIn: false, currentUser: null, error: ''};
        default:
            return state;
    }
};
