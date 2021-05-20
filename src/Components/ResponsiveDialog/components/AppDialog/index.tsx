import React, { ReactElement } from 'react';

import { Dialog, DialogProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        minWidth: 320,
    },
}));

const AppDialog = (props: DialogProps): ReactElement => {
    const classes = useStyles();

    return (
        <Dialog
            {...props}
            PaperProps={{
                className: props.className ? props.className : classes.root,
            }}
        >
            {props.children}
        </Dialog>
    );
};

export default AppDialog;
