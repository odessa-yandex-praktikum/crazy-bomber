import BomberImg from 'assets/images/bomber_icon.png';
import {GAME_CONFIG, SCENE_HEIGHT} from '../config';
import {EDirection} from '../enums';
import {Rect} from './Rect';

export class Bomber extends Rect {
    /** Контекст канваса. */
    private ctx: CanvasRenderingContext2D;
    /** Скорость полета самолета по оси X. */
    private readonly velocity: number;
    /** Изображения самолета. */
    private image: HTMLImageElement = new Image();
    /** Направление движения самолета. */
    private direction: EDirection = EDirection.TO_LEFT;

    constructor(context: CanvasRenderingContext2D) {
        super({
            x: -GAME_CONFIG.BOMBER.WIDTH,
            y: SCENE_HEIGHT - (GAME_CONFIG.FLIGHT_ROWS + 1) * GAME_CONFIG.BOMBER.HEIGHT,
            width: GAME_CONFIG.BOMBER.WIDTH,
            height: GAME_CONFIG.BOMBER.HEIGHT,
        });
        this.ctx = context;
        this.velocity = GAME_CONFIG.BOMBER.VELOCITY;
        this.image.src = String(BomberImg);
    }

    /**
     * Отрисовка самолета.
     * @description Отрисовка направления самолета зависит от направления его движения.
     */
    draw = (): void => {
        this.ctx.save();
        this.ctx.scale(this.getDirectionSign(), 1);

        this.ctx.drawImage(
            this.image,
            this.direction === EDirection.TO_RIGHT ? this.x : -GAME_CONFIG.BOMBER.WIDTH - this.x,
            this.y,
            this.width,
            this.height
        );

        this.ctx.restore();
    };

    /**
     * Изменить направления движения самолета.
     */
    public changeDirection = (direction: EDirection): void => {
        this.direction = direction;
    };

    /**
     * Получить координаты центра самолета.
     */
    public getCordCenter = () => ({
        x: this.x + this.width * 0.5,
        y: this.y + this.height * 0.5,
    });

    /**
     * Изменить координату X согласно направлению и скорости.
     */
    public move = (): void => {
        this.x += this.velocity * this.getDirectionSign();
    };

    /**
     * Опустить самолет на 1 уровень вниз.
     */
    public rowDown = (): void => {
        this.y += GAME_CONFIG.BOMBER.HEIGHT;
    };

    /**
     * Получить знак направления движения для расчетов.
     */
    private getDirectionSign = (): -1 | 1 => {
        return this.direction === EDirection.TO_RIGHT ? 1 : -1;
    };
}
