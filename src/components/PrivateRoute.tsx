import * as React from 'react';
import {RouteProps} from 'react-router';
import {Route, Redirect} from 'react-router-dom';
import {useTypedSelector} from '../store/hooks/useTypedSelector';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
    const currentUser = useTypedSelector((state) => state.user.currentUser);
    return currentUser ? <Route {...props} /> : <Redirect to="/login" />;
};
