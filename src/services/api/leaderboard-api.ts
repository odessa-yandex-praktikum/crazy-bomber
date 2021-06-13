import {
    GameResultForAPI,
    GameResults,
    GetLeaderboardDataRequest,
} from '../../store/types/leaderboard';
import {processingRequest} from './common';

export interface Data {
    name?: string;
    login?: string;
    email?: string;
    newPassword?: string;
    phone?: string;
    password?: string;
    title?: string;
    display_name?: string;
    oldPassword?: string;
    second_name?: string;
}

const url = 'https://ya-praktikum.tech/game/v2/';
const apiHost = {
    addNewLeader: 'leaderboard',
    getAll: 'leaderboard/all',
};

const limit = 5;

const toGameResultsData = (gameResults: GameResults) => {
    return gameResults.map((result, key) => ({...result.data, id: key}));
};

const toGameResultForAPI = (login: string, score: number): GameResultForAPI => ({
    data: {
        login,
        bomberscore: score,
    },
    ratingFieldName: 'bomberscore',
});

const toGetLeaderboardDataRequest = (page = 0): GetLeaderboardDataRequest => ({
    ratingFieldName: 'bomberscore',
    cursor: page,
    limit: limit,
});

const leaderboardApi = () => {
    const saveNewLeader = (login: string, score: number) => {
        const data = toGameResultForAPI(login, score);
        return fetch(url + apiHost.addNewLeader, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => processingRequest(response));
    };

    const getAll = (page = 0) => {
        const data = toGetLeaderboardDataRequest(page);
        return fetch(url + apiHost.getAll, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((r: Response) => r.json())
            .then((gameResults: GameResults) => toGameResultsData(gameResults));
    };

    return {
        saveNewLeader,
        getAll,
    };
};

export {leaderboardApi};
