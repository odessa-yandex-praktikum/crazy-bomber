import * as React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {Login} from './Pages/Login';
import {Logon} from './Pages/Logon';
import {Main} from './Pages/Main';

export class App extends React.Component {
    render() {
        return (
            <>
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
                </ul>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/logon" component={Logon} />
                </Switch>
            </>
        );
    }
}
