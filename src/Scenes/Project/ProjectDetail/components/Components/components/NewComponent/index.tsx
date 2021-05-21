import React, { ReactElement } from 'react';

import {
    Button,
    makeStyles,
    TextField,
    Typography,
    useTheme,
} from '@material-ui/core';

import { IProject } from 'GraphQL/Project/list';
import { IComponentEdits } from '../..';
import ResponsiveDialog from 'Components/ResponsiveDialog';
import Br from 'Components/Layout/Br';
import AppButton from 'Components/Inputs/AppButton';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const NewComponent = (props: {
    project: IProject;
    edits: IComponentEdits | null;
    loading: boolean;
    handleEdits: (data: IComponentEdits | null) => void;
}): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const { project, edits, handleEdits, loading } = props;

    return (
        <ResponsiveDialog
            open={Boolean(edits)}
            onClose={() => handleEdits(null)}
        >
            <div>
                <Typography variant="h5">New Component</Typography>
                <Br space={3} />
                <TextField
                    variant="outlined"
                    label="Name"
                    fullWidth
                    value={edits?.name + ''}
                    onChange={(e) =>
                        handleEdits({
                            name: e.target.value,
                            description: edits ? edits.description : '',
                            confirmed: false,
                        })
                    }
                />
                <Br space={3} />
                <TextField
                    variant="outlined"
                    label="Description"
                    fullWidth
                    value={edits?.description + ''}
                    multiline
                    rows={4}
                    rowsMax={8}
                    onChange={(e) =>
                        handleEdits({
                            name: edits ? edits.name : '',
                            description: e.target.value,
                            confirmed: false,
                        })
                    }
                />
                <Br space={3} />
                <AppButton
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    loading={loading}
                    onClick={() => {
                        if (edits) handleEdits({ ...edits, confirmed: true });
                    }}
                >
                    Save component
                </AppButton>
            </div>
        </ResponsiveDialog>
    );
};

export default NewComponent;
