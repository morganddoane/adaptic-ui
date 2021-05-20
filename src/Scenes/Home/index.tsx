import AppNav from 'Components/Navigation/AppNav';
import React, { ReactElement } from 'react';

import {
    makeStyles,
    Tab,
    Tabs,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { MdBook, MdGroup } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import { usePreferencesProvider } from 'auth/providers/UserPreferenceProvider';
import { HomeTab } from 'auth/providers/UserPreferenceProvider/types';

const breakpoint: number | Breakpoint = 'sm';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        height: '85vh',
        width: '750px',
        [theme.breakpoints.down(breakpoint)]: {
            height: '100%',
            width: '100%',
        },
        display: 'flex',
        flexFlow: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down(breakpoint)]: {
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            borderBottom: 'none',
        },
    },
    body: {
        flex: 1,
        overflow: 'auto',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const IconMap: Record<HomeTab, IconType> = {
    [HomeTab.Projects]: MdBook,
    [HomeTab.Teams]: MdGroup,
};

const Home = (): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const { home, setHome } = usePreferencesProvider();

    return (
        <AppNav>
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div style={{ flex: 1 }}>
                            <Tabs
                                variant={isSmall ? 'fullWidth' : undefined}
                                value={Object.keys(HomeTab).indexOf(home.tab)}
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="disabled tabs example"
                            >
                                {Object.keys(HomeTab).map((key) => {
                                    const Icon = IconMap[key as HomeTab];
                                    return (
                                        <Tab
                                            onClick={() =>
                                                setHome({
                                                    ...home,
                                                    tab: key as HomeTab,
                                                })
                                            }
                                            key={key}
                                            label={
                                                <div className={classes.label}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            paddingRight: 10,
                                                        }}
                                                    >
                                                        <Icon />
                                                    </div>
                                                    {key}
                                                </div>
                                            }
                                        />
                                    );
                                })}
                            </Tabs>
                        </div>
                    </div>
                    <div className={classes.body}></div>
                </div>
            </div>
        </AppNav>
    );
};

export default Home;
