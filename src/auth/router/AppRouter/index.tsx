import { useAppDataProvider } from 'auth/providers/AppDataProvider';
import Login from 'Scenes/Login';
import Unauthorized from 'Scenes/Unauthorized';
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
import Home from 'Scenes/Home';
import Project from 'Scenes/Project';
import Component from 'Scenes/Component';

export enum RouteType {
    Private = 'Private',
    Public = 'Public',
    PublicOnly = 'PublicOnly',
}

export enum RouteKey {
    Login = 'Login',
    Logout = 'Logout',
    Home = 'Home',
    Project = 'Project',
    Component = 'Component',
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
        routeProps: { path: '/login', exact: true, children: <Login /> },
    },
    [RouteKey.Unauthorized]: {
        type: RouteType.Public,
        routeProps: {
            path: '/unauthorized',
            exact: true,
            children: <Unauthorized />,
        },
    },
    [RouteKey.Home]: {
        type: RouteType.Private,
        routeProps: {
            path: '/home',
            exact: true,
            component: Home,
        },
    },
    [RouteKey.Project]: {
        type: RouteType.Private,
        routeProps: {
            path: '/projects/:id',
            exact: true,
            component: Project,
        },
    },
    [RouteKey.Project]: {
        type: RouteType.Private,
        routeProps: {
            path: '/projects/:id',
            exact: true,
            component: Project,
        },
    },
    [RouteKey.Component]: {
        type: RouteType.Private,
        routeProps: {
            path: '/component/:id',
            exact: true,
            component: Component,
        },
    },
    [RouteKey.Logout]: {
        type: RouteType.Private,
        routeProps: { path: '/logout', exact: true, children: <Logout /> },
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
