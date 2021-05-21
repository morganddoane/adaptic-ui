import AppNav from 'Components/Navigation/AppNav';
import React, { ReactElement } from 'react';

import {
    CircularProgress,
    Fab,
    Fade,
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
import Teams from './components/Teams';
import { useArtemisMutation, useArtemisQuery } from 'utils/hooks/artemisHooks';
import { flexCenter } from 'Theme/Theme';
import ResponsiveDialog from 'Components/ResponsiveDialog';
import NewTeam from './components/NewTeam';
import NewProject from './components/NewProject';
import { HomeSetupQuery, IHomeSetupQuery_Res } from 'GraphQL/Home/Setup';
import {
    CreateTeam_Mutation,
    ICreateTeam_Args,
    ICreateTeam_Res,
} from 'GraphQL/Home/Teams';
import {
    CreateProject_Mutation,
    ICreateProject_Args,
    ICreateProject_Res,
} from 'GraphQL/Home/Projects';
import Projects from './components/Projects';
import { useHistory } from 'react-router-dom';
import {
    HomeIcons,
    HomeTab,
} from 'auth/providers/UserPreferenceProvider/Scenes/HomePreferences';

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

export interface ITeamEdits {
    name: { value: string; confirmed: boolean };
    emails: { value: string[]; confirmed: boolean };
}

export interface IProjectEdits {
    name: { value: string; confirmed: boolean };
    teams: { value: string[]; confirmed: boolean };
}

const Home = (): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const { home, setHome } = usePreferencesProvider();

    const [state, setState] = React.useState<{
        moving: boolean;
        projectEdits: IProjectEdits | null;
        teamEdits: ITeamEdits | null;
        redirect: string | null;
    }>({ moving: false, projectEdits: null, teamEdits: null, redirect: null });

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

    const [
        createTeam,
        {
            data: createTeamData,
            error: createTeamError,
            loading: createTeamLoading,
            called: createTeamCalled,
            reset: resetTeamCreate,
        },
    ] = useArtemisMutation<ICreateTeam_Res, ICreateTeam_Args>(
        CreateTeam_Mutation,
        {
            variables: {
                data: state.teamEdits
                    ? {
                          name: state.teamEdits.name.value,
                          emails: state.teamEdits.emails.value,
                      }
                    : { name: '', emails: [] },
            },
            update: (cache, { data: createTeam }) => {
                cache.modify({
                    fields: {
                        teams(existing = []) {
                            const newRef = cache.writeQuery({
                                data: createTeam,
                                query: HomeSetupQuery,
                            });

                            return [...existing, newRef];
                        },
                    },
                });
            },
        }
    );

    const [
        createProject,
        {
            data: createProjectData,
            error: createProjectError,
            loading: createProjectLoading,
            called: createProjectCalled,
            reset: resetProjectCreate,
        },
    ] = useArtemisMutation<ICreateProject_Res, ICreateProject_Args>(
        CreateProject_Mutation,
        {
            variables: {
                data: state.projectEdits
                    ? {
                          name: state.projectEdits.name.value,
                          teamIDs: state.projectEdits.teams.value,
                      }
                    : { name: '', teamIDs: [] },
            },
            update: (cache, { data: createProject }) => {
                cache.modify({
                    fields: {
                        projects(existing = []) {
                            const newRef = cache.writeQuery({
                                data: createProject,
                                query: HomeSetupQuery,
                            });

                            return [...existing, newRef];
                        },
                    },
                });
            },
        }
    );

    React.useEffect(() => {
        if (createTeamData) {
            resetTeamCreate();
            setState((s) => ({ ...s, teamEdits: null }));
        }
    }, [createTeamData, resetTeamCreate]);

    React.useEffect(() => {
        if (createProjectData) {
            resetProjectCreate();
            setState((s) => ({ ...s, projectEdits: null }));
        }
    }, [createProjectData, resetProjectCreate]);

    React.useEffect(() => {
        if (
            state.teamEdits &&
            state.teamEdits.emails.confirmed &&
            state.teamEdits.name.confirmed &&
            !createTeamCalled
        ) {
            createTeam();
        }
    }, [state.teamEdits, createTeamCalled, createTeam]);

    React.useEffect(() => {
        if (
            state.projectEdits &&
            state.projectEdits.teams.confirmed &&
            state.projectEdits.name.confirmed &&
            !createProjectCalled
        ) {
            createProject();
        }
    }, [state.projectEdits, createProjectCalled, createProject]);

    React.useEffect(() => {
        if (state.redirect !== null) {
            const timeout = setTimeout(() => {
                history.push(state.redirect ? state.redirect : '');
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [history, state.redirect]);

    const { data, loading } = useArtemisQuery<IHomeSetupQuery_Res>(
        HomeSetupQuery
    );

    const teams = data ? data.teams : [];
    const projects = data ? data.projects : [];
    const teammates = data ? data.teammates : [];

    const initiate = () => {
        if (home.tab === HomeTab.Teams) {
            setState((s) => ({
                ...s,
                teamEdits: {
                    name: { value: '', confirmed: false },
                    emails: { value: [], confirmed: false },
                },
                projectEdits: null,
            }));
        } else {
            setState((s) => ({
                ...s,
                teamEdits: null,
                projectEdits: {
                    name: { value: '', confirmed: false },
                    teams: { value: [], confirmed: false },
                },
            }));
        }
    };

    const clearEdits = () => {
        setState((s) => ({
            ...s,
            teamEdits: null,
            projectEdits: null,
        }));
    };

    const MessageIcon =
        HomeIcons[
            home.tab === HomeTab.Teams
                ? state.moving
                    ? HomeTab.Projects
                    : HomeTab.Teams
                : state.moving
                ? HomeTab.Teams
                : HomeTab.Projects
        ];

    const redirect = (destination: string) => {
        setState((s) => ({ ...s, redirect: destination }));
    };

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
                if (home.tab === HomeTab.Teams) return <Teams teams={teams} />;
                return <Projects redirect={redirect} projects={projects} />;
            } else {
                const teamMessage =
                    'Teams collaborate in projects to build components.';
                const projectMessage =
                    "Projects are the home for your team's components.";
                return (
                    <div style={{ ...flexCenter, height: '100%' }}>
                        <Grow unmountOnExit in={state.moving !== true}>
                            <div>
                                <div
                                    style={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '4rem',
                                        paddingBottom: theme.spacing(1),
                                    }}
                                >
                                    <MessageIcon />
                                </div>
                                <Typography color="textPrimary">
                                    {home.tab === HomeTab.Teams
                                        ? state.moving
                                            ? projectMessage
                                            : teamMessage
                                        : state.moving
                                        ? teamMessage
                                        : projectMessage}
                                </Typography>
                                <div style={{ height: theme.spacing(3) }} />
                                <Fab
                                    onClick={initiate}
                                    variant="extended"
                                    color="primary"
                                >
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
            <Fade in={!state.redirect} timeout={300}>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <div className={classes.header}>
                            <div style={{ flex: 1 }}>
                                <Tabs
                                    variant={isSmall ? 'fullWidth' : undefined}
                                    value={Object.keys(HomeTab).indexOf(
                                        home.tab
                                    )}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="disabled tabs example"
                                >
                                    {Object.keys(HomeTab).map((key) => {
                                        const Icon = HomeIcons[key as HomeTab];
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
                                                    <div
                                                        className={
                                                            classes.label
                                                        }
                                                    >
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
                                    onClick={initiate}
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
                                    onClick={initiate}
                                >
                                    <MdAdd />
                                    New Project
                                </Fab>
                            </Grow>
                        </div>
                    </div>
                </div>
            </Fade>
            <ResponsiveDialog
                open={Boolean(state.projectEdits || state.teamEdits)}
                onClose={clearEdits}
            >
                <React.Fragment>
                    {state.teamEdits && (
                        <NewTeam
                            loading={createTeamLoading}
                            teammates={teammates}
                            edits={state.teamEdits}
                            handleEdits={(data: ITeamEdits | null) =>
                                setState((s) => ({ ...s, teamEdits: data }))
                            }
                        />
                    )}
                    {state.projectEdits && (
                        <NewProject
                            loading={createProjectLoading}
                            teams={teams}
                            edits={state.projectEdits}
                            handleEdits={(data: IProjectEdits | null) =>
                                setState((s) => ({ ...s, projectEdits: data }))
                            }
                        />
                    )}
                </React.Fragment>
            </ResponsiveDialog>
        </AppNav>
    );
};

export default Home;
