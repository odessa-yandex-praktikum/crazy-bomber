import {IRectParams} from '../models';

/**
 * Абстрактный класс прямоугольника.
 */
export abstract class Rect {
    protected x: number;
    protected y: number;
    protected readonly height: number;
    protected readonly width: number;

    protected constructor({x, y, width, height}: IRectParams) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public getX = (): number => this.x;
    public getY = (): number => this.y;
    public getHeight = (): number => this.height;
    public getWidth = (): number => this.width;
}
