import BulletImg from '../../../assets/images/bullet.png';
import {randomInteger} from '../../../utils/Utils';
import {GAME_CONFIG} from '../config';
import {Rect} from './Rect';

/**
 * Начальные параметры снаряда.
 *
 * @param context Контекст канваса.
 * @param x Координата X.
 * @param y Координата Y.
 */
interface IBulletParams {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
}

export class Bullet extends Rect {
    /** Контекст канваса. */
    private ctx: CanvasRenderingContext2D;
    /** Скорость полета снаряда по оси Y. */
    private velocity: number;
    /** Изображения снаряда. */
    private image: HTMLImageElement = new Image();
    /** Пробивающая сила снаряда (сколько этажей может уничтожить). */
    private power: number;

    constructor({context, x, y}: IBulletParams) {
        super({x, y, width: GAME_CONFIG.BULLET.WIDTH, height: GAME_CONFIG.BULLET.HEIGHT});
        this.ctx = context;
        this.velocity = GAME_CONFIG.BULLET.VELOCITY;
        this.power = randomInteger(1, 3);

        this.image.src = String(BulletImg);
    }

    /**
     * Проверка, активен ли еще снаряд.
     */
    public isActive = (): boolean => {
        return this.power > 0;
    };

    /**
     * Уменьшение пробивающей силы.
     */
    public decPower = (): void => {
        this.power--;
    };

    /**
     * Отрисовка снаряда.
     */
    public draw = (): void => {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    /**
     * Изменить координату Y в зависимости от скорости.
     */
    public move = (): void => {
        this.y += this.velocity;
    };
}
