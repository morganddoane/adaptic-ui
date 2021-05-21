import React, { ReactElement } from 'react';

import {
    Fab,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@material-ui/core';

import { useHistory, useParams } from 'react-router';
import { IProject, ProjectQuery } from 'GraphQL/Project/list';
import { justifySpace } from 'Theme/Theme';
import Br from 'Components/Layout/Br';
import { sortBy } from 'lodash';
import { ComponentSortBy } from 'auth/providers/UserPreferenceProvider/Scenes/ProjectPreferences';
import { usePreferencesProvider } from 'auth/providers/UserPreferenceProvider';
import { Add } from '@material-ui/icons';
import NewComponent from './components/NewComponent';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import { CreateProject_Mutation } from 'GraphQL/Home/Projects';
import {
    CreateComponent_Mutation,
    ICreateComponent_Args,
    ICreateComponent_Res,
} from 'GraphQL/Project/createComponent';
import { setCommentRange } from 'typescript';
import { gql } from '@apollo/client';
import ProjectDetail from '../..';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        height: '100%',
        display: 'flex',
        color: theme.palette.text.primary,
    },
    list: {
        minWidth: 300,
        display: 'flex',
        flexFlow: 'column',
    },
    body: {
        flex: 1,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    listBody: {
        flex: 1,
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto',
    },
}));

export interface IComponentEdits {
    name: string;
    description: string;
    confirmed: boolean;
}

const ProjectComponents = (props: { project: IProject }): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const { project } = props;

    const [state, setState] = React.useState<{ edits: IComponentEdits | null }>(
        {
            edits: null,
        }
    );

    const [
        createComponent,
        { data, error, loading, reset, called },
    ] = useArtemisMutation<ICreateComponent_Res, ICreateComponent_Args>(
        CreateComponent_Mutation,
        {
            variables: {
                data: state.edits
                    ? {
                          projectID: project.id,
                          name: state.edits.name,
                          description:
                              state.edits.description &&
                              state.edits.description.length > 0
                                  ? state.edits.description
                                  : undefined,
                      }
                    : {
                          projectID: '',
                          name: '',
                          description: '',
                      },
            },
            refetchQueries: [
                { query: ProjectQuery, variables: { id: project.id } },
            ],
        }
    );

    React.useEffect(() => {
        if (state.edits && state.edits.confirmed && !called) {
            createComponent();
        }
    }, [state.edits, createComponent, called]);

    React.useEffect(() => {
        if (data) {
            reset();
            setState((s) => ({ ...s, edits: null }));
        }
    }, [data, reset]);

    const {
        project: projectPreferences,
        setProject,
    } = usePreferencesProvider();

    const initiate = () => {
        setState((s) => ({
            ...s,
            edits: { name: '', description: '', confirmed: false },
        }));
    };

    const active = project.components.find(
        (comp) => comp.id === projectPreferences.component
    );

    return (
        <div className={classes.root}>
            <div className={classes.list}>
                <div className={classes.head}>
                    <div style={{ ...justifySpace }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h6">Components</Typography>
                            <Br space={0.5} />
                            <TextField
                                value={projectPreferences.componentSortBy}
                                select
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                onChange={(event) =>
                                    setProject({
                                        ...projectPreferences,
                                        componentSortBy: event.target
                                            .value as ComponentSortBy,
                                    })
                                }
                            >
                                {Object.keys(ComponentSortBy).map((val) => (
                                    <MenuItem value={val} key={'sb_' + val}>
                                        {val}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Br space={0.5} />
                        </div>
                        <div style={{ paddingLeft: theme.spacing(2) }}>
                            <Tooltip arrow title="New component">
                                <Fab
                                    onClick={initiate}
                                    size="small"
                                    color="primary"
                                >
                                    <Add />
                                </Fab>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={classes.listBody}>
                    <List disablePadding>
                        {project.components.map((c) => (
                            <ListItem
                                divider
                                onClick={() =>
                                    setProject({
                                        ...projectPreferences,
                                        component: c.id,
                                    })
                                }
                                selected={active && active.id === c.id}
                                button
                                key={c.id}
                            >
                                <ListItemText
                                    primary={c.name}
                                    secondary={c.description}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
            <div className={classes.body}></div>
            <NewComponent
                loading={loading}
                edits={state.edits}
                handleEdits={(data: IComponentEdits | null) =>
                    setState((s) => ({ ...s, edits: data }))
                }
                project={project}
            />
        </div>
    );
};

export default ProjectComponents;
