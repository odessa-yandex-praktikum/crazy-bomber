import * as React from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router';
import {PrivateRoute} from './Components/PrivateRoute';
import {FallBack} from './Pages/FallBack';
import {ErrorBoundary} from './components/errorBoundary';

const Leaderboard = React.lazy(() => import('./pages/leaderboard/index'));
const Game = React.lazy(() => import('./pages/gameboard/components/Game'));
const Gameover = React.lazy(() => import('./pages/gameover/index'));
const Main = React.lazy(() => import('./pages/start/index'));
const Profile = React.lazy(() => import('./pages/profile/index'));
const Login = React.lazy(() => import('./pages/login/index'));
const Signin = React.lazy(() => import('./pages/signin/index'));
const Forum = React.lazy(() => import('./pages/forum/index'));
const ForumTopic = React.lazy(() => import('./pages/forumtopic/index'));

export function App() {
    const location = useLocation();

    return (
        <React.Suspense fallback={<FallBack />}>
            <ErrorBoundary key={location.pathname}>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                    <PrivateRoute path="/game" exact component={Game} />
                    <PrivateRoute path="/gameover" exact component={Gameover} />
                    <Route path="/start" exact component={Main} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path="/forum" exact component={Forum} />
                    <PrivateRoute path="/forum/:id" exact component={ForumTopic} />
                    <Redirect from="*" to="/start" />
                </Switch>
            </ErrorBoundary>
        </React.Suspense>
    );
}
