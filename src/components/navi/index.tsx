import * as React from 'react';
import './navi.css';
import {Link} from 'react-router-dom';

/**
 * @param itemClass класс, задающий форматирование элементу навигации
 * @param itemHeading заголовок раздела
 * @param itemPath ссылка для перехода на раздел
 */
export class TNaviItem {
    constructor(public itemHeading: string, public itemPath: string) {}
}

/**
 * @param classNavi класс, задающий форматирование списку навигации
 * @param arrayNaviItems массив элементов навигации
 */
export type TNaviProps = {
    arrayNaviItems: TNaviItem[];
};

export const Navi: React.FC<TNaviProps> = ({arrayNaviItems}: TNaviProps) => {
    return (
        <ul className="navi__list">
            {arrayNaviItems.map((item) => (
                <li className="navi__item" key={item.itemHeading}>
                    <Link to={item.itemPath} className="navi__link">
                        {item.itemHeading}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
