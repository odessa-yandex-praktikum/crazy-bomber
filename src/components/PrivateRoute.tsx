import * as React from 'react';
import {RouteProps} from 'react-router';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
    return useAuth().isAuthorized ? <Route {...props} /> : <Redirect to="/login" />;
};
