import React, { ReactElement } from 'react';
import { UserContext } from 'auth/UserContext';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserRole } from 'GraphQL/Auth/queries';

interface PrivateRouteProps extends RouteProps {
    user: UserContext | null;
    adminOnly?: boolean;
}

const PrivateRoute = (props: PrivateRouteProps): ReactElement => {
    const { user, adminOnly = false, children, ...options } = props;

    if (!user) return <Redirect to="/login" />;
    if (adminOnly && !user.roles.includes(UserRole.Admin))
        return <Redirect to="/unauthorized" />;
    return <Route {...options}>{children}</Route>;
};

export default PrivateRoute;
