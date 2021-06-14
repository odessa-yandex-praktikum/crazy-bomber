import {Dispatch} from 'redux';
import {leaderboardApi} from '../../services/api/leaderboard-api';
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

function saveScore(avatar: string, login: string, score: number) {
    return async (dispatch: Dispatch) => {
        dispatch(leaderboardLoading());
        const {saveLeader} = leaderboardApi();

        await saveLeader(avatar, login, score).catch((error: Error) => {
            dispatch(leaderboardLoadingFailure(error.message));
            console.log(error);
        });
    };
}

function loadLeaderboard(page = 0) {
    return async (dispatch: Dispatch) => {
        dispatch(leaderboardLoading());
        const {getAll} = leaderboardApi();
        try {
            const gameResults = await getAll(page);
            dispatch(leaderboardLoadingSuccess(gameResults));
        } catch (error) {
            dispatch(leaderboardLoadingFailure(error));
            console.log(error);
        }
    };
}

export type LeaderboardAction = LeaderboardLoading | LeaderboardSuccess | LeaderboardFailure;
