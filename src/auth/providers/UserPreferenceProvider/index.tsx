import { useMediaQuery } from '@material-ui/core';

import React, { ReactElement } from 'react';
import {
    HomeTab,
    IAction,
    IAppPreferences,
    IHomePreferences,
    IPreferences,
    IPreferencesContext,
} from './types';

const reducer = (state: IPreferences, action: IAction): IPreferences => {
    switch (action.type) {
        case 'Home':
            return {
                ...state,
                home: action.payload,
            };

        default:
            return state;
    }
};

const initState: IPreferences = {
    home: {
        tab: HomeTab.Projects,
    },
    app: {
        darkMode: true,
    },
};

export const AppPreferencesContext = React.createContext<IPreferencesContext>({
    ...initState,
    setHome: (data: IHomePreferences) => null,
    setApp: (data: IAppPreferences) => null,
});

const AppPreferencesProvider = (props: {
    children: ReactElement;
}): ReactElement => {
    const { children } = props;

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const darkMode = localStorage.getItem('darkMode');

    const stateFromStorage = localStorage.getItem('AppPreferences');

    const initialState = stateFromStorage
        ? JSON.parse(stateFromStorage)
        : initState;

    const [state, dispatch] = React.useReducer(reducer, {
        ...initialState,
    });

    React.useEffect(() => {
        localStorage.setItem('AppPreferences', JSON.stringify(state));
    }, [state]);

    const setHome = (data: IHomePreferences) => {
        dispatch({
            type: 'Home',
            payload: data,
        });
    };

    const setApp = (data: IAppPreferences) => {
        dispatch({
            type: 'App',
            payload: data,
        });
    };

    return (
        <AppPreferencesContext.Provider value={{ ...state, setHome, setApp }}>
            {children}
        </AppPreferencesContext.Provider>
    );
};

export const usePreferencesProvider = (): IPreferencesContext =>
    React.useContext(AppPreferencesContext);

export default AppPreferencesProvider;
