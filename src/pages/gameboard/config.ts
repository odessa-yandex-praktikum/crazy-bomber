export const SCENE_WIDTH = window.innerWidth;
export const SCENE_HEIGHT = window.innerHeight;

/**
 * Игровой конфиг.
 */
export const GAME_CONFIG = {
    /** Количество рядов, которые пролетит самолет за игру. */
    FLIGHT_ROWS: 15,
    BOMBER: {
        /** Ширина самолета. */
        WIDTH: SCENE_WIDTH * 0.15,
        /** Высота самолета. */
        HEIGHT: SCENE_HEIGHT * 0.06,
        /** Скорость самолета. */
        VELOCITY: SCENE_WIDTH * 0.01,
    },
    BUILDING: {
        /** Ширина зданий. */
        WIDTH: SCENE_WIDTH * 0.09,
        /** Высота одного этажа здания. */
        BLOCK_HEIGHT: SCENE_HEIGHT * 0.05,
        /** Начальная точка строительства города. */
        START_POINT: SCENE_WIDTH * 0.2,
        /** Конечная точка строительства города. */
        END_POINT: SCENE_WIDTH * 0.8,
    },
    BULLET: {
        /** Ширина снаряда. */
        WIDTH: SCENE_WIDTH * 0.015,
        /** Высота снаряда. */
        HEIGHT: SCENE_HEIGHT * 0.06,
        /** Скорость снаряда. */
        VELOCITY: SCENE_WIDTH * 0.01,
    },
};
