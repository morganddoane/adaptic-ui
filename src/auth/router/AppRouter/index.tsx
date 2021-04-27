import { useAppDataProvider } from 'auth/providers/AppDataProvider';
import Home from 'Components/Scenes/Home';
import Login from 'Components/Scenes/Login';
import Unauthorized from 'Components/Scenes/Unauthorized';
import React, { ReactElement } from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    RouteProps,
    Switch,
} from 'react-router-dom';
import PrivateRoute from '../RouteComponents/PrivateRoute';
import PublicOnlyRoute from '../RouteComponents/PublicOnlyRoute';
import PublicRoute from '../RouteComponents/PublicRoute';

export enum RouteType {
    Private = 'Private',
    Public = 'Public',
    PublicOnly = 'PublicOnly',
}

export enum RouteKey {
    Login = 'Login',
    Logout = 'Logout',
    Home = 'Home',
    Unauthorized = 'Unauthorized',
}

export interface IRoute {
    type: RouteType;
    routeProps: RouteProps;
}

const Logout = (): null => {
    const { logoutUser } = useAppDataProvider();
    logoutUser();
    return null;
};

const appRoutes: Record<RouteKey, IRoute> = {
    [RouteKey.Login]: {
        type: RouteType.PublicOnly,
        routeProps: { path: '/login', exact: true, component: Login },
    },
    [RouteKey.Unauthorized]: {
        type: RouteType.Public,
        routeProps: {
            path: '/unauthorized',
            exact: true,
            component: Unauthorized,
        },
    },
    [RouteKey.Home]: {
        type: RouteType.Private,
        routeProps: { path: '/home', exact: true, component: Home },
    },
    [RouteKey.Logout]: {
        type: RouteType.Private,
        routeProps: { path: '/logout', exact: true, component: Logout },
    },
};

export const AppRouter = (): ReactElement => {
    const { user } = useAppDataProvider();
    return (
        <BrowserRouter>
            <Switch>
                {Object.entries(appRoutes).map(([key, route]) => {
                    switch (route.type) {
                        case RouteType.PublicOnly: {
                            return (
                                <PublicOnlyRoute
                                    key={key}
                                    user={user}
                                    {...route.routeProps}
                                />
                            );
                        }
                        case RouteType.Public: {
                            return (
                                <PublicRoute
                                    key={key}
                                    user={user}
                                    {...route.routeProps}
                                />
                            );
                        }
                        case RouteType.Private: {
                            return (
                                <PrivateRoute
                                    key={key}
                                    user={user}
                                    {...route.routeProps}
                                />
                            );
                        }
                    }
                })}
            </Switch>
            <Route path="/" exact>
                <Redirect
                    to={
                        Object.values(appRoutes).find(
                            (r) => r.type === RouteType.Private
                        )?.routeProps.path + ''
                    }
                />
            </Route>
        </BrowserRouter>
    );
};
