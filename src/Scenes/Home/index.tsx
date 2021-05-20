import AppNav from 'Components/Navigation/AppNav';
import React, { ReactElement } from 'react';

import {
    CircularProgress,
    Fab,
    Grow,
    makeStyles,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { MdAdd, MdBook, MdGroup } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import { usePreferencesProvider } from 'auth/providers/UserPreferenceProvider';
import { HomeTab } from 'auth/providers/UserPreferenceProvider/types';
import Teams from './components/Teams';
import { useArtemisQuery } from 'utils/hooks/artemisHooks';
import { ITeamsQuery_Res, TeamsQuery } from 'GraphQL/Home/Teams';
import { flexCenter } from 'Theme/Palette';
import Status from 'Components/Feedback/Status';
import { IProjectsQuery_Res, ProjectsQuery } from 'GraphQL/Home/Projects';

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
        position: 'relative',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        right: 0,
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

    const [state, setState] = React.useState({ moving: false });

    React.useEffect(() => {
        setState((s) => ({ ...s, moving: true }));
    }, [home.tab]);

    React.useEffect(() => {
        if (state.moving === true) {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, moving: false }));
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [state.moving]);

    const {
        data: teamData,
        loading: teamLoading,
    } = useArtemisQuery<ITeamsQuery_Res>(TeamsQuery);

    const teams = teamData ? teamData.teams : [];

    const {
        data: projectData,
        loading: projectLoading,
    } = useArtemisQuery<IProjectsQuery_Res>(ProjectsQuery);

    const projects = projectData ? projectData.projects : [];

    const loading = teamLoading || projectLoading;

    const getView = () => {
        if (loading)
            return (
                <div style={{ ...flexCenter, height: '100%' }}>
                    <CircularProgress />
                </div>
            );
        else {
            const data = home.tab === HomeTab.Teams ? teams : projects;
            if (data.length > 0) {
                if (home.tab === HomeTab.Teams) return <Teams />;
            } else {
                const teamMessage =
                    'Teams collaborate in projects to build components.';
                const projectMessage =
                    "Projects are the home for your team's components.";
                return (
                    <div style={{ ...flexCenter, height: '100%' }}>
                        <Grow unmountOnExit in={state.moving !== true}>
                            <div>
                                <Typography color="textPrimary">
                                    {home.tab === HomeTab.Teams
                                        ? state.moving
                                            ? projectMessage
                                            : teamMessage
                                        : state.moving
                                        ? teamMessage
                                        : projectMessage}
                                </Typography>
                                <Fab variant="extended" color="primary">
                                    <MdAdd />
                                    {home.tab === HomeTab.Teams
                                        ? state.moving
                                            ? 'Create a project'
                                            : 'Create a team'
                                        : state.moving
                                        ? 'Create a team'
                                        : 'Create a project'}
                                </Fab>
                            </div>
                        </Grow>
                    </div>
                );
            }
        }
    };

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
                    <div className={classes.body}>
                        {getView()}
                        <Grow
                            in={
                                state.moving !== true &&
                                home.tab === HomeTab.Teams &&
                                teams.length > 0
                            }
                        >
                            <Fab
                                className={classes.fab}
                                variant="extended"
                                color="primary"
                            >
                                <MdAdd />
                                New Team
                            </Fab>
                        </Grow>
                        <Grow
                            in={
                                state.moving !== true &&
                                home.tab === HomeTab.Projects &&
                                projects.length > 0
                            }
                        >
                            <Fab
                                className={classes.fab}
                                variant="extended"
                                color="primary"
                            >
                                <MdAdd />
                                New Project
                            </Fab>
                        </Grow>
                    </div>
                </div>
            </div>
        </AppNav>
    );
};

export default Home;
