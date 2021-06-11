import * as React from 'react';
import {useEffect} from 'react';

type TCallback = (time: number) => void;

export const useAnimationFrame = (callback: TCallback) => {
    /**
     * useRef используйте для изменяемых переменных, которые должны
     * должны сохраняться от рендера к рендеру без триггера самого рендера.
     */

    /** Здесь хранится длинное целое, являющееся уникальным идентификатором для записи, содержащей callback. Необходимо для отмены вызова. */
    const requestRef = React.useRef<number>(0);
    /** Предыдущая временная отметка, в которой произошла анимация. */
    const previousTimeRef = React.useRef<number>();

    /**
     * Функция анимации для requestAnimationFrame.
     * @param time Временная отметка.
     */
    const animate: FrameRequestCallback = (time) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
};
