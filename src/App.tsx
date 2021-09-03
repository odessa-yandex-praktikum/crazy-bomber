import {PrivateRoute, UnAuthorizedRoute} from 'components/PrivateRoute';
import {ErrorBoundary} from 'components/errorBoundary';
import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Redirect, Switch, useLocation} from 'react-router-dom';
import loadable from '@loadable/component';
import {getUserOauth} from './action';
import './common.css';
import {getUserThemeById} from './store/actions/userActions';
import {useTypedSelector} from './store/hooks/useTypedSelector';

const Leaderboard = loadable(() => import('./pages/leaderboard/index'));
/** Так как отрисовка игры зависит от DOM'а, то нет смысла рендерить этот роут на бекенде. */
const Game = loadable(() => import('./pages/gameboard/components/Game'), {ssr: false});
const Gameover = loadable(() => import('./pages/gameover/index'));
const Main = loadable(() => import('./pages/start/index'));
const Profile = loadable(() => import('./pages/profile/index'));
const Login = loadable(() => import('./pages/login/index'));
const Signin = loadable(() => import('./pages/signin/index'));
const Forum = loadable(() => import('./pages/forum/Pages/Forum'));
const Topic = loadable(() => import('./pages/forum/Pages/Topic'));

export function App() {
    const dispatch = useDispatch();
    const currentUser = useTypedSelector((state) => state.user.currentUser!);

    useEffect(() => {
        void getUserThemeById(currentUser?.id, dispatch);
    }, []);

    const location = useLocation();

    return (
        <ErrorBoundary key={location?.pathname}>
            <Switch>
                <UnAuthorizedRoute path="/login" exact component={Login} />
                <UnAuthorizedRoute path="/signin" exact component={Signin} />
                <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                <PrivateRoute path="/game" exact component={Game} />
                <PrivateRoute path="/gameover" exact component={Gameover} />
                <PrivateRoute path="/start" exact component={Main} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/crazy-forum" exact component={Forum} />
                <PrivateRoute path="/crazy-forum/:id" exact component={Topic} />
                <Redirect from="/" to={getUserOauth()} />
                <Redirect from="*" to="/start" />
            </Switch>
        </ErrorBoundary>
    );
}
