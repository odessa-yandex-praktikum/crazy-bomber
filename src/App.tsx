import * as React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {PrivateRoute} from './Components/PrivateRoute';
import {FallBack} from './Pages/Fallback';

const Leaderboard = React.lazy(() => import('./pages/leaderboard/index'));
const Gameboard = React.lazy(() => import('./pages/gameboard/index'));
const Start = React.lazy(() => import('./pages/start/index'));
const Profile = React.lazy(() => import('./pages/profile/index'));
const Login = React.lazy(() => import('./Pages/Login'));
const Logon = React.lazy(() => import('./Pages/Logon'));
const Main = React.lazy(() => import('./Pages/Main'));

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
                        <Link to="/logon">logon</Link>
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
                </ul>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/logon" exact component={Logon} />
                    <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                    <PrivateRoute path="/game" exact component={Gameboard} />
                    <Route path="/start" exact component={Start} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <Route path="/" component={Main} />
                </Switch>
            </React.Suspense>
        );
    }
}
