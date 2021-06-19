import {combineReducers} from 'redux';
import {leaderboardReducer} from './leaderboardReducer';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
