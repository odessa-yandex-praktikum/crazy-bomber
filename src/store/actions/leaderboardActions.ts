import {Dispatch} from 'redux';
import {leaderboardApi} from '../../services/api/leaderboard-api';
import {RootState} from '../reducers';
import {GameResultsData, LeaderboardActionTypes} from '../types/leaderboard';

export const leaderboardActions = {
    saveScore,
    loadLeaderboard,
};

type LeaderboardLoading = {
    type: typeof LeaderboardActionTypes.LEADERBOARD_LOADING;
};

type LeaderboardSuccess = {
    type: typeof LeaderboardActionTypes.LEADERBOARD_SUCCESS;
    payload: {gameResultsData: GameResultsData | null};
};

type LeaderboardFailure = {
    type: typeof LeaderboardActionTypes.LEADERBOARD_FAILURE;
    payload: {error: string};
};

export const leaderboardLoading = (): LeaderboardLoading => {
    return {
        type: LeaderboardActionTypes.LEADERBOARD_LOADING,
    };
};

export const leaderboardLoadingSuccess = (gameResultsData: GameResultsData): LeaderboardSuccess => {
    return {
        type: LeaderboardActionTypes.LEADERBOARD_SUCCESS,
        payload: {gameResultsData},
    };
};

export const leaderboardLoadingFailure = (error: string): LeaderboardFailure => {
    return {
        type: LeaderboardActionTypes.LEADERBOARD_FAILURE,
        payload: {error},
    };
};

function saveScore(score: number) {
    return async (dispatch: Dispatch, state: RootState) => {
        dispatch(leaderboardLoading());
        const {saveNewLeader: saveLeader} = leaderboardApi();
        try {
            const currentUser = state.user.currentUser;
            if (!currentUser) {
                throw new Error('Failed to load user data');
            }
            await saveLeader(currentUser.login, score);
        } catch (error) {
            dispatch(leaderboardLoadingFailure(error));
        }
    };
}

function loadLeaderboard(page = 0) {
    return async (dispatch: Dispatch) => {
        dispatch(leaderboardLoading());
        const {getAll: getLeaderboard} = leaderboardApi();
        try {
            const gameResultsData = await getLeaderboard(page);
            dispatch(leaderboardLoadingSuccess(gameResultsData));
        } catch (error) {
            dispatch(leaderboardLoadingFailure(error));
        }
    };
}

export type LeaderboardAction = LeaderboardLoading | LeaderboardSuccess | LeaderboardFailure;
