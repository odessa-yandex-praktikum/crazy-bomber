import {
    AuthenticationState,
    AuthenticationActionTypes,
    AuthenticationAction,
    Nullable,
    User,
} from '../types/user';

const currentUser: Nullable<User> = JSON.parse(<string>localStorage.getItem('user'));
const initialState: AuthenticationState = currentUser
    ? {
          loggingIn: true,
          currentUser: currentUser,
          error: null,
      }
    : {
          loggingIn: false,
          currentUser: null,
          error: null,
      };

export const authenticationReducer = (
    state = initialState,
    action: AuthenticationAction
): AuthenticationState => {
    switch (action.type) {
        case AuthenticationActionTypes.LOGIN_REQUEST:
            return {loggingIn: false, currentUser: null, error: null};
        case AuthenticationActionTypes.LOGIN_SUCCESS:
            return {loggingIn: true, currentUser: action.currentUser, error: null};
        case AuthenticationActionTypes.LOGIN_FAILURE:
            return {loggingIn: false, currentUser: null, error: action.error};
        case AuthenticationActionTypes.LOGOUT:
            return {loggingIn: false, currentUser: null, error: null};
        default:
            return state;
    }
};
