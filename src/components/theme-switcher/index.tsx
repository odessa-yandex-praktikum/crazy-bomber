import React, {useCallback} from 'react';
import './theme-switcher.css';
import {useDispatch} from 'react-redux';
import {userActions} from '../../store/actions/userActions';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';

export const ThemeSwitcher: React.FC = () => {
    const dispatch = useDispatch();
    const {id} = useTypedSelector((state) => state.user.currentUser!);
    const themeSwitcherClick = (e: Event) => {
        dispatch(userActions.changeTheme(e?.target?.value, id));
    };
    return (
        <div className={'theme-switcher theme-switcher__right-top'}>
            <input
                key="grey"
                type="radio"
                name="theme"
                className={'theme-switcher__input theme-switcher__grey'}
                value="GREY"
                onClick={useCallback((e) => themeSwitcherClick(e), [])}
            />
            <input
                key="green"
                type="radio"
                name="theme"
                className={'theme-switcher__input theme-switcher__green'}
                onClick={useCallback((e) => themeSwitcherClick(e), [])}
                value="GREEN"
            />
            <input
                key="red"
                type="radio"
                name="theme"
                className={'theme-switcher__input theme-switcher__red'}
                onClick={useCallback((e) => themeSwitcherClick(e), [])}
                value="RED"
            />
        </div>
    );
};
