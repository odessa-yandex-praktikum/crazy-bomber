import BlockImg from '../../../assets/images/block.png';
import {GAME_CONFIG, SCENE_HEIGHT} from '../config';
import {Rect} from './Rect';

/**
 * Начальные параметры снаряда.
 *
 * @param context Контекст канваса.
 * @param x Координата X.
 * @param floors Количество этажей в здании.
 */
interface IBuildingParams {
    context: CanvasRenderingContext2D;
    x: number;
    floors: number;
}

export class Building extends Rect {
    /** Контекст канваса. */
    private ctx: CanvasRenderingContext2D;
    /** Изображения одного этажа здания. */
    private image: HTMLImageElement = new Image();
    /** Количество этажей в здании. */
    private floors: number;

    constructor({context, x, floors}: IBuildingParams) {
        super({
            x,
            y: SCENE_HEIGHT - floors * GAME_CONFIG.BUILDING.BLOCK_HEIGHT,
            width: GAME_CONFIG.BUILDING.WIDTH,
            height: floors * GAME_CONFIG.BUILDING.BLOCK_HEIGHT,
        });
        this.floors = floors;
        this.ctx = context;
        this.image.src = String(BlockImg);
    }

    /**
     * Удаление этажа.
     * @description Так как начало координат в канвасе находится слева вверху, то
     *  чтобы "опустить" здание на этаж, надо увеличить Y.
     */
    deleteFloor = (): void => {
        this.floors--;
        this.y += GAME_CONFIG.BUILDING.BLOCK_HEIGHT;
    };

    /**
     * Проверка, не уничтожено ли здание.
     */
    isActive = (): boolean => {
        return this.floors > 0;
    };

    /**
     * Отрисовка здания.
     * @description Отрисовка происходит по этажу.
     */
    draw = (): void => {
        for (let floor = 0; floor < this.floors; floor++) {
            this.ctx.drawImage(
                this.image,
                this.x,
                this.y + GAME_CONFIG.BUILDING.BLOCK_HEIGHT * floor,
                this.width,
                GAME_CONFIG.BUILDING.BLOCK_HEIGHT
            );
        }
    };
}
