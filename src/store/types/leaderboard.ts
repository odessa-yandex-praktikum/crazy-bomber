type GameResultData = {
    id: number;
    login: string;
    bomberscore: number;
};

type GameResult = {
    data: {
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

export {GameResult, GameResultForAPI, GameResults, GameResultsData, GetLeaderboardDataRequest};
