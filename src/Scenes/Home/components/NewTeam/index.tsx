import React, { ReactElement } from 'react';

import {
    Button,
    Collapse,
    Fade,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { ITeamEdits } from 'Scenes/Home';
import Br from 'Components/Layout/Br';
import { MdChevronLeft, MdClear, MdClose, MdSearch } from 'react-icons/md';
import clsx from 'clsx';
import ViewFade from 'Components/Navigation/ViewFade';
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { IPerson } from 'GraphQL/Home/Teams';
import { genTempId } from 'utils/functions';
import AppButton from 'Components/Inputs/AppButton';
const filter = createFilterOptions<IPerson>();

const duration = 1000;

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
    },
    expanded: {},
}));

const NewTeam = (props: {
    teammates: IPerson[];
    edits: ITeamEdits;
    loading: boolean;
    handleEdits: (data: ITeamEdits | null) => void;
}): ReactElement => {
    const classes = useStyles();

    const { teammates, edits, loading, handleEdits } = props;

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
                <Typography variant="h5">New team</Typography>
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
                            Add some teammates
                        </Typography>
                    </div>
                    <Br />
                    <Autocomplete
                        fullWidth
                        value={state.email}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                setState((s) => ({ ...s, email: newValue }));
                            } else if (newValue) {
                                // Create a new value from the user input

                                handleEdits({
                                    ...edits,
                                    emails: {
                                        confirmed: false,
                                        value: [
                                            ...edits.emails.value,
                                            newValue.email,
                                        ],
                                    },
                                });
                                setState((s) => ({ ...s, email: '' }));
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            // Suggest the creation of a new value
                            if (params.inputValue !== '') {
                                filtered.push({
                                    id: '',
                                    first: '',
                                    email: params.inputValue,
                                    last: '',
                                    full: '',
                                });
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={teammates}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.email;
                        }}
                        renderOption={(option) => option.email}
                        freeSolo
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Add teammates by email..."
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <Br />
                    <div style={{ height: 200, overflow: 'auto' }}>
                        <List disablePadding>
                            {edits.emails.value.map((email) => (
                                <ListItem key={genTempId()}>
                                    <ListItemText primary={email} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                handleEdits({
                                                    ...edits,
                                                    emails: {
                                                        ...edits.emails,
                                                        value: edits.emails.value.filter(
                                                            (e) => e !== email
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
                            emails: {
                                ...edits.emails,
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

export default NewTeam;
