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
        case UserActionTypes.USER_ACTION_REQUEST:
            return {loggedIn: false, currentUser: null, error: ''};
        case UserActionTypes.USER_ACTION_SUCCESS:
            return {loggedIn: true, currentUser: action.currentUser, error: ''};
        case UserActionTypes.USER_ACTION_FAILURE:
            return {loggedIn: false, currentUser: null, error: action.error};
        case UserActionTypes.LOGOUT:
            return {loggedIn: false, currentUser: null, error: ''};
        default:
            return state;
    }
};
