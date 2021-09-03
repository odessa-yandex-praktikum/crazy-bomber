type GameResultData = {
    id: number;
    avatar: string;
    login: string;
    bomberscore: number;
};

type GameResult = {
    data: {
        avatar: string;
        login: string;
        bomberscore: number;
    };
};

type GameResultForAPI = GameResult & {
    ratingFieldName: 'bomberscore';
};

type GetLeaderboardDataRequest = {
    ratingFieldName: 'bomberscore';
    cursor: number;
    limit: number;
};

type GameResults = GameResult[];
type GameResultsData = GameResultData[];

export enum LeaderboardActionTypes {
    LEADERBOARD_LOADING = 'LEADERBOARD_LOADING',
    LEADERBOARD_SUCCESS = 'LEADERBOARD_SUCCESS',
    LEADERBOARD_FAILURE = 'LEADERBOARD_FAILURE',
}

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

export type LeaderboardAction = LeaderboardLoading | LeaderboardSuccess | LeaderboardFailure;

export const leaderboardActionCreator = {
    loading: (): LeaderboardLoading => {
        return {
            type: LeaderboardActionTypes.LEADERBOARD_LOADING,
        };
    },
    success: (gameResultsData: GameResultsData): LeaderboardSuccess => {
        return {
            type: LeaderboardActionTypes.LEADERBOARD_SUCCESS,
            payload: {gameResultsData},
        };
    },
    failure: (error: string): LeaderboardFailure => {
        return {
            type: LeaderboardActionTypes.LEADERBOARD_FAILURE,
            payload: {error},
        };
    },
};

export {
    GameResult,
    GameResultForAPI,
    GameResults,
    GameResultData,
    GameResultsData,
    GetLeaderboardDataRequest,
};
