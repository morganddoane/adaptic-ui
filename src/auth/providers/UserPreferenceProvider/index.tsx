import { useMediaQuery } from '@material-ui/core';

import React, { ReactElement } from 'react';
import { HomeTab, IHomePreferences } from './Scenes/HomePreferences';
import {
    ComponentSortBy,
    IProjectPreferences,
    ProjectTab,
} from './Scenes/ProjectPreferences';
import {
    IAction,
    IAppPreferences,
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
        case 'Project':
            return {
                ...state,
                project: action.payload,
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
    project: {
        tab: ProjectTab.Components,
        componentSortBy: ComponentSortBy.Name,
    },
};

export const AppPreferencesContext = React.createContext<IPreferencesContext>({
    ...initState,
    setHome: (data: IHomePreferences) => null,
    setApp: (data: IAppPreferences) => null,
    setProject: (data: IProjectPreferences) => null,
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
        ...initState,
        ...initialState,
    });

    React.useEffect(() => {
        localStorage.setItem('AppPreferences', JSON.stringify(state));
    }, [state]);

    const setApp = (data: IAppPreferences) => {
        dispatch({
            type: 'App',
            payload: data,
        });
    };

    const setHome = (data: IHomePreferences) => {
        dispatch({
            type: 'Home',
            payload: data,
        });
    };

    const setProject = (data: IProjectPreferences) => {
        dispatch({
            type: 'Project',
            payload: data,
        });
    };

    return (
        <AppPreferencesContext.Provider
            value={{ ...state, setApp, setHome, setProject }}
        >
            {children}
        </AppPreferencesContext.Provider>
    );
};

export const usePreferencesProvider = (): IPreferencesContext =>
    React.useContext(AppPreferencesContext);

export default AppPreferencesProvider;
