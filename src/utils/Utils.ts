function findFiveLeaders(playersArray: Player[]) {
    //5 - потому что мы ищем пять лидеров для отображения на борде
    return playersArray
        .sort((player1: Player, player2: Player) => player2.score - player1.score)
        .slice(0, 5);
}

function convertScoreToString(num: number) {
    //-7 - потому что максимально мы показываем 7 символов
    return String(`0000000${num}`).slice(-7);
}

class Player {
    id: number;
    img: string;
    login: string;
    score: number;

    constructor(id: number, img: string, login: string, score: number) {
        this.id = id;
        this.img = img;
        this.login = login;
        this.score = score;
    }
}
