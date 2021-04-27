import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';

export class AxiosError extends Error {}

export interface IAxiosResponseData<T> {
    loading: boolean;
    called: boolean;
    data?: AxiosResponse<T>;
    error?: AxiosError;
    reset: () => void;
}

export interface IAxiosState<T> {
    loading: boolean;
    called: boolean;
    data?: AxiosResponse<T>;
    error?: AxiosError;
    args?: AxiosRequestConfig;
}

const defaultState = {
    loading: false,
    called: false,
};

export const useAxios = <T>(): [
    (args: AxiosRequestConfig) => void,
    IAxiosResponseData<T>
] => {
    const [state, setState] = React.useState<IAxiosState<T>>(defaultState);

    React.useEffect(() => {
        let continueRes = true;

        const execute = async (): Promise<void> => {
            if (!state.args)
                throw new Error('Axios request config args not provided.');

            try {
                const res = await Axios(state.args);
                if (continueRes)
                    setState({
                        data: res,
                        loading: false,
                        called: true,
                        error: undefined,
                    });
            } catch (e) {
                if (continueRes)
                    setState({
                        data: undefined,
                        loading: false,
                        called: true,
                        error: new AxiosError(e.message),
                    });
            }
        };

        if (state.loading) execute();

        return () => {
            continueRes = false;
        };
    }, [state]);

    const execute = (args: AxiosRequestConfig): void => {
        setState({
            ...state,
            loading: true,
            args: args,
        });
    };

    const reset = () => {
        setState(defaultState);
    };

    return [
        execute,
        {
            loading: state.loading,
            error: state.error,
            data: state.data,
            called: state.called,
            reset: reset,
        },
    ];
};
