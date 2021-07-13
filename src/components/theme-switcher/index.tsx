import * as React from 'react';
import './theme-switcher.css';
import '../../common.css';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {userActions} from '../../store/actions/userActions';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';

export const updateTheme = (theme: string) => {
    if (theme === 'GREY') {
        document.documentElement.style.setProperty('--color-form', 'rgba(174, 180, 189, 0.35)');
        document.documentElement.style.setProperty('--color-container', 'rgba(174, 180, 189, 1)');
    }
    if (theme === 'GREEN') {
        document.documentElement.style.setProperty('--color-form', 'rgba(93, 230, 71, 0.37)');
        document.documentElement.style.setProperty('--color-container', 'rgba(93, 230, 71, 1)');
    }
    if (theme === 'RED') {
        document.documentElement.style.setProperty('--color-form', 'rgba(186, 0, 53, 0.37)');
        document.documentElement.style.setProperty('--color-container', 'rgba(186, 0, 53, 1)');
    }
};

export const ThemeSwitcher: React.FC = () => {
    const dispatch = useDispatch();
    const {id} = useTypedSelector((state) => state.user.currentUser!);
    const {theme} = useTypedSelector((state) => state.user!);
    console.log(id);
    console.log(theme);
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
