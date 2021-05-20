import React, { ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAppDataProvider } from 'auth/providers/AppDataProvider';
import { usePreferencesProvider } from 'auth/providers/UserPreferenceProvider';

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
                    '& svg': {
                        fontSize: '1.3rem',
                    },
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
            MuiInputBase: {
                inputAdornedStart: {
                    marginLeft: 8,
                },
            },
            MuiAvatar: {
                colorDefault: {
                    fontSize: '1rem',
                    color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.87)',
                    backgroundColor: darkMode
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        radius: (multiplier: number) => multiplier * 4,
    });

export const Palette = (props: { children: ReactElement }): ReactElement => {
    const { app } = usePreferencesProvider();
    const themeValue = theme(app.darkMode);
    document.body.style.backgroundColor = themeValue.palette.background.default;

    return <ThemeProvider theme={themeValue}>{props.children}</ThemeProvider>;
};

export const flexCenter: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
};
