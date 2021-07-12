import React from 'react';
import {RouteProps, Route, Redirect} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
    const {isAuthorized} = useAuth();
    return isAuthorized ? <Route {...props} /> : <Redirect to="/login" />;
};
