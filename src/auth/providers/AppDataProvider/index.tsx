import { useLazyQuery, useMutation } from '@apollo/client';
import { useMediaQuery } from '@material-ui/core';

import { UserContext } from 'auth/UserContext';
import {
    ILoggedInUser_Response,
    QLoggedInUser_Query,
    ILogout_Response,
    QLogout_Query,
} from 'GraphQL/Auth/queries';
import React, { ReactElement } from 'react';
import { isUnauthenticatedError } from 'utils/errors';
import {
    IAppState,
    IAction,
    AppActionType,
    IActionSetUser,
    IActionSetError,
    IContextState,
} from './types';

const reducer = (state: IAppState, action: IAction): IAppState => {
    switch (action.type) {
        case AppActionType.SetUser:
            return {
                ...state,
                loading: false,
                complete: true,
                user: (action as IActionSetUser).payload,
            };
        case AppActionType.SetLoading:
            return {
                ...state,
                loading: true,
            };
        case AppActionType.SetError:
            return {
                ...state,
                complete: true,
                error: true,
                exception: (action as IActionSetError).payload,
            };
        case AppActionType.SetComplete:
            return {
                ...state,
                loading: false,
                complete: true,
            };
        default:
            return state;
    }
};

const initState: IAppState = {
    user: null,
    loading: true,
    error: false,
    complete: false,
};

export const AppDataContext = React.createContext<IContextState>({
    ...initState,
    setUser: (user: UserContext) => null,
    logoutUser: () => null,
});

const AppDataProvider = (props: { children: ReactElement }): ReactElement => {
    const { children } = props;

    const [state, dispatch] = React.useReducer(reducer, {
        ...initState,
    });

    const [getUser, getUserData] = useLazyQuery<ILoggedInUser_Response>(
        QLoggedInUser_Query
    );
    const [logout, logoutData] = useMutation<ILogout_Response>(QLogout_Query, {
        errorPolicy: 'all',
    });

    if (
        !state.complete &&
        !getUserData.loading &&
        !getUserData.error &&
        !getUserData.data
    ) {
        // Try to get user
        getUser();
    } else if (!state.loading && (getUserData.loading || logoutData.loading)) {
        // Set state to loading
        dispatch({
            type: AppActionType.SetLoading,
        });
    } else if (
        !state.complete &&
        !getUserData.loading &&
        !getUserData.error &&
        getUserData.data
    ) {
        // User came back! Set it
        const userObj = getUserData.data.loggedInUser.user;
        const user = new UserContext(userObj);

        dispatch({
            type: AppActionType.SetUser,
            payload: user,
        });
    } else if (
        !state.complete &&
        getUserData.error &&
        isUnauthenticatedError(getUserData.error)
    ) {
        // Unauthorized response, don't set user
        dispatch({
            type: AppActionType.SetComplete,
        });
    } else if (!state.complete && getUserData.error) {
        dispatch({
            type: AppActionType.SetError,
            payload: getUserData.error,
        });
    } else if (
        state.complete &&
        state.user &&
        (logoutData.data || logoutData.error)
    ) {
        // Logout user
        window.location.reload();
    }

    const setUser = (data: UserContext): void => {
        dispatch({
            type: AppActionType.SetUser,
            payload: data,
        });
    };

    const logoutUser = (): void => {
        logout();
    };

    return (
        <AppDataContext.Provider value={{ ...state, setUser, logoutUser }}>
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppDataProvider = (): IContextState =>
    React.useContext(AppDataContext);

export default AppDataProvider;
