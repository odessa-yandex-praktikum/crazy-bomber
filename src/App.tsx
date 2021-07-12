import {PrivateRoute} from 'components/PrivateRoute';
import {ErrorBoundary} from 'components/errorBoundary';
import * as React from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import loadable from '@loadable/component';
import {getUserOauth} from './action';

const Leaderboard = loadable(() => import('./pages/leaderboard/index'));
/** Так как отрисовка игры зависит от DOM'а, то нет смысла рендерить этот роут на бекенде. */
const Game = loadable(() => import('./pages/gameboard/components/Game'), {ssr: false});
const Gameover = loadable(() => import('./pages/gameover/index'));
const Main = loadable(() => import('./pages/start/index'));
const Profile = loadable(() => import('./pages/profile/index'));
const Login = loadable(() => import('./pages/login/index'));
const Signin = loadable(() => import('./pages/signin/index'));
const Forum = loadable(() => import('./pages/forum/index'));
const ForumTopic = loadable(() => import('./pages/forumtopic/index'));

export function App() {
    const location = useLocation();

    return (
        <ErrorBoundary key={location?.pathname}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                <PrivateRoute path="/game" exact component={Game} />
                <PrivateRoute path="/gameover" exact component={Gameover} />
                <PrivateRoute path="/start" exact component={Main} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/forum" exact component={Forum} />
                <PrivateRoute path="/forum/:id" exact component={ForumTopic} />
                <Redirect from="/" to={getUserOauth()} />
                <Redirect from="*" to="/start" />
            </Switch>
        </ErrorBoundary>
    );
}
