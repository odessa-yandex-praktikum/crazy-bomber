import {UserActionTypes, Nullable, User, UserState, UserAction} from '../types/user';

const currentUser: Nullable<User> = JSON.parse(<string>localStorage.getItem('user'));
const initialState: UserState = currentUser
    ? {
          loggingIn: true,
          currentUser: currentUser,
          error: '',
      }
    : {
          loggingIn: false,
          currentUser: null,
          error: '',
      };

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.USER_ACTION_REQUEST:
            return {loggingIn: false, currentUser: null, error: ''};
        case UserActionTypes.USER_ACTION_SUCCESS:
            return {loggingIn: true, currentUser: action.currentUser, error: ''};
        case UserActionTypes.USER_ACTION_FAILURE:
            return {loggingIn: false, currentUser: null, error: action.error};
        case UserActionTypes.LOGOUT:
            return {loggingIn: false, currentUser: null, error: ''};
        default:
            return state;
    }
};
