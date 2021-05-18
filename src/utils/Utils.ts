//util functions for leaderboard page
class Player {
    constructor(
        public id: number,
        public img: string,
        public login: string,
        public score: number
    ) {}
}

export function findFiveLeaders(playersArray: Player[]) {
    //5 - потому что мы ищем пять лидеров для отображения на борде
    return playersArray
        .sort((player1: Player, player2: Player) => player2.score - player1.score)
        .slice(0, 5);
}

export function convertScoreToString(num: number) {
    //-7 - потому что максимально мы показываем 7 символов
    return String(`0000000${num}`).slice(-7);
}

//util functions for forum page
class Message {
    constructor(public message: string, public author: Player, public created: number) {}
}

export class Discussion {
    constructor(
        public id: number,
        public topic: string,
        public author: Player,
        public created: number,
        public votes: number,
        public messages: Message[]
    ) {}
}

export function sortDescending(discussionsArray: Discussion[]) {
    return discussionsArray.sort(
        (discussion1: Discussion, discussion2: Discussion) => discussion2.votes - discussion1.votes
    );
}

export function determineCreationDate(date: number) {
    const now = new Date();
    const creationDate = new Date(date);
    let resultValue;
    if (now.getFullYear() - creationDate.getFullYear() > 0) {
        resultValue = now.getFullYear() - creationDate.getFullYear();
        return String(resultValue) + (resultValue === 1 ? ' year ago' : ' years ago');
    } else if (now.getMonth() - creationDate.getMonth() > 0) {
        resultValue = now.getMonth() - creationDate.getMonth();
        return String(resultValue) + (resultValue === 1 ? ' month ago' : ' months ago');
    } else if (now.getDate() - creationDate.getDate() > 0) {
        resultValue = now.getDate() - creationDate.getDate();
        return String(resultValue) + (resultValue === 1 ? ' day ago' : ' days ago');
    } else if (now.getHours() - creationDate.getHours() > 0) {
        resultValue = now.getHours() - creationDate.getHours();
        return String(resultValue) + (resultValue === 1 ? ' hour ago' : ' hours ago');
    } else if (now.getMinutes() - creationDate.getMinutes() > 0) {
        resultValue = now.getMinutes() - creationDate.getMinutes();
        return String(resultValue) + (resultValue === 1 ? ' minute ago' : ' minutes ago');
    } else if (now.getSeconds() - creationDate.getSeconds() > 0) {
        resultValue = now.getSeconds() - creationDate.getSeconds();
        return String(resultValue) + (resultValue === 1 ? ' second ago' : ' seconds ago');
    }
}

//util functions for navigation
export function createNaviPath(naviHeading: string) {
    return `/${naviHeading}`;
}
