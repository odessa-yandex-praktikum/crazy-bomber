import * as React from 'react';
import './navigation.css';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {userActions} from '../../store/actions/userActions';
import {createNaviPath} from '../../utils/Utils';

export type TNavigationProps = {
    navigationItems: string[];
};

export const Navigation: React.FC<TNavigationProps> = ({navigationItems}: TNavigationProps) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <ul className="navi__list">
            {navigationItems.map((item) => (
                <li className="navi__item" key={item}>
                    {item === 'logout' && (
                        <button
                            type="button"
                            onClick={useCallback(() => {
                                dispatch(userActions.logout());
                                history.push('/login');
                            }, [dispatch, history])}
                            className="navi__link navi__button"
                        >
                            {item}
                        </button>
                    )}
                    {item !== 'logout' && (
                        <Link to={createNaviPath(item)} className="navi__link">
                            {item}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
};
