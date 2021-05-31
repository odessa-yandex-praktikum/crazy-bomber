import {combineReducers} from 'redux';
import {authenticationReducer} from './authenticationReducer';
import {registrationReducer} from './registrationReducer';

export const rootReducer = combineReducers({
    registration: registrationReducer,
    authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
