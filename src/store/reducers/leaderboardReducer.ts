import {LeaderboardAction} from '../actions/leaderboardActions';
import {GameResultsData, LeaderboardActionTypes} from '../types/leaderboard';

export type LeaderboardState = {
    gameResultsData: GameResultsData | null;
    error?: string;
};

export const initialState = {
    gameResultsData: [],
};

export const leaderboardReducer = (
    state: LeaderboardState = initialState,
    action: LeaderboardAction
): LeaderboardState => {
    switch (action.type) {
        case LeaderboardActionTypes.LEADERBOARD_LOADING:
            return {
                ...state,
            };
        case LeaderboardActionTypes.LEADERBOARD_SUCCESS:
            return {
                ...state,
                gameResultsData: action.payload.gameResultsData,
            };
        case LeaderboardActionTypes.LEADERBOARD_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
