import {
    IProjectPreferences,
    IProjectAction,
} from './Scenes/ProjectPreferences';
import { IHomePreferences, IHomeAction } from './Scenes/HomePreferences';

export interface IPreferences {
    app: IAppPreferences;
    home: IHomePreferences;
    project: IProjectPreferences;
}

export interface IPreferencesContext extends IPreferences {
    setHome: (data: IHomePreferences) => void;
    setApp: (data: IAppPreferences) => void;
    setProject: (data: IProjectPreferences) => void;
}

export interface IAppPreferences {
    darkMode: boolean;
}

export interface IAppAction {
    type: 'App';
    payload: {
        darkMode: boolean;
    };
}

export type IAction = IAppAction | IHomeAction | IProjectAction;
