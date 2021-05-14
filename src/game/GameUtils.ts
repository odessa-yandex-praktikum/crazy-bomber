import {EBuilding} from '../consts/game.types';
import {Bomber, Building, Coordinate} from './Models';

const drawInitialStage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const initialBomberCoordinate = new Coordinate(50, 50);
    const bomber = new Bomber(initialBomberCoordinate);
    const image = new Image();
    image.src = bomber.img;
    image.onload = function () {
        ctx.drawImage(image, bomber.coordinate.x, bomber.coordinate.y);
    };
    drawBuilding(canvas.width / 20, canvas.height / 1.4, EBuilding.APARTMENT_HOUSE_1, ctx);
    drawBuilding(canvas.width / 12, canvas.height / 1.27, EBuilding.PLANT, ctx);
    drawBuilding(canvas.width / 4, canvas.height / 1.4, EBuilding.PUBLISHING_HOUSE, ctx);
    drawBuilding(canvas.width / 3.1, canvas.height / 1.22, EBuilding.SCHOOL, ctx);
    drawBuilding(canvas.width / 2.5, canvas.height / 2, EBuilding.MEDIUM_SKYSCRAPER, ctx);
    drawBuilding(canvas.width / 2.2, canvas.height / 1.57, EBuilding.APARTMENT_HOUSE_2, ctx);
    drawBuilding(canvas.width / 2, canvas.height / 1.4, EBuilding.PUBLISHING_HOUSE, ctx);
    drawBuilding(canvas.width / 1.55, canvas.height / 2.05, EBuilding.HIGH_SKYSCRAPER, ctx);
    drawBuilding(canvas.width / 1.47, canvas.height / 1.5, EBuilding.LOW_SKYSCRAPER, ctx);
    drawBuilding(canvas.width / 1.2, canvas.height / 1.2, EBuilding.SCHOOL, ctx);
};

const drawBuilding = (x: number, y: number, type: EBuilding, ctx: CanvasRenderingContext2D) => {
    const initialCoordinate = new Coordinate(x, y);
    const building = new Building(initialCoordinate, type);
    const image = new Image();
    image.src = building.img;
    image.onload = function () {
        ctx.drawImage(image, x, y);
    };
};

//в другом пул реквесте функция в утилитах, чтобы не было конфликта внесена временно сюда
//TODO: использовать класс с утилитами из пул-реквеста #4
const convertScoreToString = (num: number) => {
    //-7 - потому что максимально мы показываем 7 символов
    return String(`0000000${num}`).slice(-7);
};

export {drawInitialStage, convertScoreToString};
