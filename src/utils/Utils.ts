import {IRectParams} from '../pages/gameboard/models';

class Player {
    constructor(
        public id: number,
        public img: string,
        public login: string,
        public score: number
    ) {}
}

export function convertScoreToString(num: number) {
    //-7 - потому что максимально мы показываем 7 символов
    return String(`0000000${num}`).slice(-7);
}

//util functions for forum page
export class Message {
    constructor(public message: string, public author: Player, public created: number) {}
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

/**
 * случайное число от min до max.
 */
export function randomInteger(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * @param a Левая координата первого отрезка.
 * @param b Левая координата второго отрезка.
 */
interface ILine {
    a: number;
    b: number;
}

/**
 * Проверяет пересечение двух отрезков.
 */
export function intersectLine(line1: ILine, line2: ILine) {
    return Math.max(line1.a, line2.a) <= Math.min(line1.b, line2.b);
}

/**
 * Проверяет пересечение двух прямоугольников.
 */
export function intersect(rect1: IRectParams, rect2: IRectParams) {
    return (
        intersectLine(
            {a: rect1.x, b: rect1.x + rect1.width},
            {a: rect2.x, b: rect2.x + rect2.width}
        ) &&
        intersectLine(
            {a: rect1.y, b: rect1.y + rect1.height},
            {a: rect2.y, b: rect2.y + rect2.height}
        )
    );
}

/**
 * Функция, проверяющая, выполняется ли код на сервере или на клиенте.
 */
export const isServer = () =>
    !(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Геттер-функция Документа DOM'а.
 */
export const getBrowserDocument = (): Document | undefined => {
    return isServer() ? undefined : window?.document;
};
