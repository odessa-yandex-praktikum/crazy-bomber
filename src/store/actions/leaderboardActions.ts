import {Dispatch} from 'redux';
import {leaderboardApi} from '../../services/api/leaderboard-api';
import {leaderboardActionCreator} from '../types/leaderboard';

function saveScore(avatar: string, login: string, score: number) {
    return async (dispatch: Dispatch) => {
        dispatch(leaderboardActionCreator.loading());
        const {apiSaveLeader} = leaderboardApi();

        await apiSaveLeader(avatar, login, score).catch((error: Error) => {
            dispatch(leaderboardActionCreator.failure(error.message));
            console.log(error);
        });
    };
}

function loadLeaderboard(page = 0) {
    return async (dispatch: Dispatch) => {
        dispatch(leaderboardActionCreator.loading());
        const {apiGetAll} = leaderboardApi();
        try {
            const gameResults = await apiGetAll(page);
            dispatch(leaderboardActionCreator.success(gameResults));
        } catch (error) {
            dispatch(leaderboardActionCreator.failure(error));
            console.log(error);
        }
    };
}

export const leaderboardActions = {
    saveScore,
    loadLeaderboard,
};
