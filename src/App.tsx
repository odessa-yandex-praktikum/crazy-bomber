import * as React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {PrivateRoute} from './Components/PrivateRoute';
import {FallBack} from './Pages/Fallback';

const Leaderboard = React.lazy(() => import('./pages/leaderboard/index'));
const Gameboard = React.lazy(() => import('./pages/gameboard/index'));
const Start = React.lazy(() => import('./pages/start/index'));
const Profile = React.lazy(() => import('./pages/profile/index'));
const Login = React.lazy(() => import('./pages/login/index'));
const Signin = React.lazy(() => import('./pages/signin/index'));
const Forum = React.lazy(() => import('./pages/forum/index'));
const ForumTopic = React.lazy(() => import('./pages/forumtopic/index'));
const Main = React.lazy(() => import('./pages/start/index'));

export class App extends React.Component {
    render() {
        return (
            <React.Suspense fallback={<FallBack />}>
                <ul>
                    <li>
                        {/* TODO: Редиректы между пейджами потом переедут в кнопки на интерфейсе. */}
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signin">Signin</Link>
                    </li>
                    <li>
                        <Link to="/leaderboard">leaderboard</Link>
                    </li>
                    <li>
                        <Link to="/game">Gameboard</Link>
                    </li>
                    <li>
                        <Link to="/start">Start</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/forum">Forum</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                    <PrivateRoute path="/game" exact component={Gameboard} />
                    <Route path="/start" exact component={Start} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path="/forum" exact component={Forum} />
                    <PrivateRoute path="/forum/:id" exact component={ForumTopic} />
                    <Route path="/" component={Main} />
                </Switch>
            </React.Suspense>
        );
    }
}
