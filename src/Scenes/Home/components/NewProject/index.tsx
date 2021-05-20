import React, { ReactElement } from 'react';

import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { IProjectEdits, ITeamEdits } from 'Scenes/Home';
import Br from 'Components/Layout/Br';
import { MdChevronLeft, MdClear, MdClose, MdSearch } from 'react-icons/md';
import clsx from 'clsx';
import ViewFade from 'Components/Navigation/ViewFade';
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { ITeam } from 'GraphQL/Home/Teams';
import { genTempId } from 'utils/functions';
import AppButton from 'Components/Inputs/AppButton';
const filter = createFilterOptions<ITeam>();

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
    },
    expanded: {},
}));

const NewProject = (props: {
    teams: ITeam[];
    edits: IProjectEdits;
    loading: boolean;
    handleEdits: (data: IProjectEdits | null) => void;
}): ReactElement => {
    const classes = useStyles();

    const { teams, edits, loading, handleEdits } = props;

    const [state, setState] = React.useState({ moving: false, email: '' });

    const index = edits.name.confirmed ? 1 : 0;

    return (
        <div className={clsx(classes.root, classes.expanded)}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h5">New project</Typography>
                <IconButton size="small">
                    <MdClose />
                </IconButton>
            </div>
            <Br space={3} />
            <ViewFade index={index}>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Name"
                        value={edits.name.value}
                        onChange={(e) =>
                            handleEdits({
                                ...edits,
                                name: { ...edits.name, value: e.target.value },
                            })
                        }
                    />
                </div>
                <div>
                    <Button
                        onClick={() => {
                            handleEdits({
                                ...edits,
                                name: {
                                    ...edits.name,
                                    confirmed: false,
                                },
                            });
                        }}
                        startIcon={<MdChevronLeft />}
                    >
                        {edits.name.value}
                    </Button>
                    <div>
                        <Typography variant="caption" color="textSecondary">
                            Add some teams to your project
                        </Typography>
                    </div>
                    <Br />
                    <Autocomplete
                        clearOnEscape
                        clearOnBlur
                        options={teams}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {
                            if (value) {
                                handleEdits({
                                    ...edits,
                                    teams: {
                                        ...edits.teams,
                                        value: [...edits.teams.value, value.id],
                                    },
                                });
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                            />
                        )}
                    />
                    <Br />
                    <div style={{ height: 200, overflow: 'auto' }}>
                        <List disablePadding>
                            {teams
                                .filter((team) =>
                                    edits.teams.value.includes(team.id)
                                )
                                .map((team) => (
                                    <ListItem key={genTempId()}>
                                        <ListItemText primary={team.name} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    handleEdits({
                                                        ...edits,
                                                        teams: {
                                                            ...edits.teams,
                                                            value: edits.teams.value.filter(
                                                                (e) =>
                                                                    e !==
                                                                    team.id
                                                            ),
                                                        },
                                                    });
                                                }}
                                            >
                                                <MdClear />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                </div>
            </ViewFade>
            <Br space={3} />
            <AppButton
                loading={loading}
                disabled={edits.name.value.length === 0}
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                    if (!edits.name.confirmed) {
                        handleEdits({
                            ...edits,
                            name: {
                                ...edits.name,
                                confirmed: true,
                            },
                        });
                    } else {
                        handleEdits({
                            ...edits,
                            teams: {
                                ...edits.teams,
                                confirmed: true,
                            },
                        });
                    }
                }}
            >
                Next
            </AppButton>
        </div>
    );
};

export default NewProject;
