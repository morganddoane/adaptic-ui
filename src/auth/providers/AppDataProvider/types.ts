import { UserContext } from 'auth/UserContext';

export enum AppActionType {
    SetUser,
    SetLoading,
    SetError,
    SetComplete,
    SetDarkMode,
}

export interface IAction {
    type: AppActionType;
    payload?: unknown;
}

export interface IActionSetUser extends IAction {
    payload: UserContext;
}

export interface IActionSetDarkMode extends IAction {
    payload: boolean;
}

export interface IActionSetError extends IAction {
    payload: Error;
}

export interface IAppState {
    user: UserContext | null;
    loading: boolean;
    error: boolean;
    complete: boolean;
    exception?: Error;
    darkMode?: boolean;
}

export interface IContextState extends IAppState {
    setUser: (user: UserContext) => void;
    logoutUser: () => void;
    setDarkMode: (value: boolean) => void;
}
