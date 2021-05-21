import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {PrivateRoute} from './Components/PrivateRoute';
import {FallBack} from './Pages/Fallback';

const Leaderboard = React.lazy(() => import('./pages/leaderboard/index'));
const Gameboard = React.lazy(() => import('./pages/gameboard/index'));
const Main = React.lazy(() => import('./pages/start/index'));
const Profile = React.lazy(() => import('./pages/profile/index'));
const Login = React.lazy(() => import('./pages/login/index'));
const Signin = React.lazy(() => import('./pages/signin/index'));
const Forum = React.lazy(() => import('./pages/forum/index'));
const ForumTopic = React.lazy(() => import('./pages/forumtopic/index'));

export class App extends React.Component {
    render() {
        return (
            <React.Suspense fallback={<FallBack />}>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                    <PrivateRoute path="/game" exact component={Gameboard} />
                    <Route path="/start" exact component={Main} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path="/forum" exact component={Forum} />
                    <PrivateRoute path="/forum/:id" exact component={ForumTopic} />
                    <Redirect from="*" to="/start" />
                </Switch>
            </React.Suspense>
        );
    }
}
