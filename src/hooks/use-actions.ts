import {useRef, Dispatch} from 'react';
import {useDispatch} from 'react-redux';

/**
 * Хук для работы с экшнами.
 *
 * @param actionsClass Класс с экшнами.
 * @param params Любые необязательные параметры, передаваемые в конструктор класса.
 */
export function useActions<T>(
    actionsClass: new (dispatch: Dispatch, ...params: any[]) => T,
    ...params: any[]
): T {
    const dispatch = useDispatch();
    const ref = useRef<T | null>(null);

    if (!ref.current) {
        ref.current = new actionsClass(dispatch, ...params);
    }

    return ref.current;
}
