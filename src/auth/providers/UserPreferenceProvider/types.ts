export interface IPreferences {
    app: IAppPreferences;
    home: IHomePreferences;
}

export interface IPreferencesContext extends IPreferences {
    setHome: (data: IHomePreferences) => void;
    setApp: (data: IAppPreferences) => void;
}

export interface IHomePreferences {
    tab: HomeTab;
}

export interface IAppPreferences {
    darkMode: boolean;
}

export interface IHomeAction {
    type: 'Home';
    payload: {
        tab: HomeTab;
    };
}

export enum HomeTab {
    Projects = 'Projects',
    Teams = 'Teams',
}

export interface IAppAction {
    type: 'App';
    payload: {
        darkMode: boolean;
    };
}

export type IAction = IHomeAction | IAppAction;
