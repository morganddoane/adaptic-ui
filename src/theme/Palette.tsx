import React, { ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAppDataProvider } from 'auth/providers/AppDataProvider';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        radius: (multiplier: number) => number;
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        radius: (multiplier: number) => number;
    }
}

const theme = (darkMode: boolean) =>
    createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : undefined,
            primary: {
                main: '#304ffe',
            },
            background: {
                default: darkMode ? '#1B1B1B' : '#F8F8F5',
                paper: darkMode ? '#242424' : '#fff',
            },
        },
        overrides: {
            MuiFab: {
                root: {
                    textTransform: 'none',
                },
            },
            MuiButton: {
                root: {
                    textTransform: 'none',
                },
            },
            MuiTab: {
                root: {
                    fontSize: '1rem',
                    textTransform: 'none',
                    color: darkMode
                        ? '#fff !important'
                        : 'rgba(0, 0, 0, 0.87) !important',
                },
            },
        },
        radius: (multiplier: number) => multiplier * 4,
    });

export const Palette = (props: { children: ReactElement }): ReactElement => {
    const { darkMode } = useAppDataProvider();
    const themeValue = theme(Boolean(darkMode));
    document.body.style.backgroundColor = themeValue.palette.background.default;

    return <ThemeProvider theme={themeValue}>{props.children}</ThemeProvider>;
};
