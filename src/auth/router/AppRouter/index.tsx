import Home from 'Components/Scenes/Home';
import Login from 'Components/Scenes/Login';
import Unauthorized from 'Components/Scenes/Unauthorized';
import React, { ReactElement } from 'react';
import { BrowserRouter, RouteProps, Switch } from 'react-router-dom';
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
    Home = 'Home',
    Unauthorized = 'Unauthorized',
}

export interface IRoute {
    type: RouteType;
    routeProps: RouteProps;
}

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
};

export const AppRouter = (): ReactElement => {
    return (
        <BrowserRouter>
            <Switch>
                {Object.entries(appRoutes).map(([key, route]) => {
                    switch (route.type) {
                        case RouteType.PublicOnly: {
                            return (
                                <PublicOnlyRoute
                                    user={null}
                                    {...route.routeProps}
                                />
                            );
                        }
                        case RouteType.Public: {
                            return (
                                <PublicRoute
                                    user={null}
                                    {...route.routeProps}
                                />
                            );
                        }
                        case RouteType.Private: {
                            return (
                                <PrivateRoute
                                    user={null}
                                    {...route.routeProps}
                                />
                            );
                        }
                    }
                })}
            </Switch>
        </BrowserRouter>
    );
};
