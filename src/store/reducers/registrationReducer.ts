import {RegistrationAction, RegistrationActionTypes, RegistrationState} from '../types/user';

const initialState: RegistrationState = {
    registering: false,
    error: null,
};

export const registrationReducer = (
    state = initialState,
    action: RegistrationAction
): RegistrationState => {
    switch (action.type) {
        case RegistrationActionTypes.REGIST_REQUEST:
            return {registering: true, error: null};
        case RegistrationActionTypes.REGISTER_SUCCESS:
            return {registering: false, error: null};
        case RegistrationActionTypes.REGISTER_FAILURE:
            return {registering: false, error: action.error};
        default:
            return state;
    }
};
