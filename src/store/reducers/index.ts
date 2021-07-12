import {connectRouter} from 'connected-react-router';
import {History} from 'history';
import {Reducer} from 'react';
import {combineReducers} from 'redux';
import {IAppState} from '../index';
import {leaderboardReducer} from './leaderboardReducer';
import {userReducer} from './userReducer';

export const getInitialReducer = (history: History): Reducer<IAppState, any> => {
    return combineReducers({
        user: userReducer,
        leaderboard: leaderboardReducer,
        router: connectRouter(history),
    });
};
