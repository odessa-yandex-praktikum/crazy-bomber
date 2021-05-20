import * as React from 'react';
import './navigation.css';
import {Link} from 'react-router-dom';
import {createNaviPath} from '../../utils/Utils';

export type TNavigationProps = {
    navigationItems: string[];
};

export const Navigation: React.FC<TNavigationProps> = ({navigationItems}: TNavigationProps) => {
    return (
        <ul className="navi__list">
            {navigationItems.map((item) => (
                <li className="navi__item" key={item}>
                    <Link to={createNaviPath(item)} className="navi__link">
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
