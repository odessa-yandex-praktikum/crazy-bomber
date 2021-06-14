import {
    GameResultForAPI,
    GameResults,
    GetLeaderboardDataRequest,
} from '../../store/types/leaderboard';
import {processingRequest} from './common';

const url = 'https://ya-praktikum.tech/api/v2/';
const apiHost = {
    addNewLeader: 'leaderboard',
    getAll: 'leaderboard/all',
};

//5 - потому что мы ищем пять лидеров для отображения на борде
const limit = 5;

const toGameResultsData = (gameResults: GameResults) => {
    return gameResults.map((result, key) => ({...result.data, id: key}));
};

const toGameResultForAPI = (avatar: string, login: string, score: number): GameResultForAPI => ({
    data: {
        avatar,
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
    const apiSaveLeader = (avatar: string, login: string, score: number) => {
        const data = toGameResultForAPI(avatar, login, score);
        console.log(data);
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

    const apiGetAll = (page = 0) => {
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
        apiSaveLeader,
        apiGetAll,
    };
};

export {leaderboardApi};
