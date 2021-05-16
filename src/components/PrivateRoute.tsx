import * as React from 'react';
import {RouteProps} from 'react-router';
import {Route, Redirect} from 'react-router-dom';

const isLogged = () => {
    // TODO: добавить логику проверки залоггированности.
    return true;
};

export const PrivateRoute: React.FC<RouteProps> = (props) =>
    isLogged() ? <Route {...props} /> : <Redirect to="/" />;
