import React, { ReactElement } from 'react';
import { UserContext } from 'auth/UserContext';
import { Redirect, Route, RouteProps } from 'react-router';

interface PublicRouteProps extends RouteProps {
    user: UserContext | null;
}

const PublicRoute = (props: PublicRouteProps): ReactElement => {
    const { user, children, ...options } = props;

    if (user) return <Redirect to="/" />;
    return <Route {...options}>{children}</Route>;
};

export default PublicRoute;
