import * as React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {PrivateRoute} from './components/PrivateRoute';
import {FallBack} from './Pages/Fallback';

const Leaderboard = React.lazy(() => import('./pages/leaderboard/index'));
const Login = React.lazy(() => import('./Pages/Login'));
const Logon = React.lazy(() => import('./Pages/Logon'));
const Main = React.lazy(() => import('./Pages/Main'));
const GameBoard = React.lazy(() => import('./pages/gameboard/index'));

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
                        <Link to="/game">Game</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/logon" exact component={Logon} />
                    <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
                    <Route path="/" component={Main} />
                    <Route path="/game" component={GameBoard} />
                </Switch>
            </React.Suspense>
        );
    }
}
