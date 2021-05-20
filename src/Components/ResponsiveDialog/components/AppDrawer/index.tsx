import React, { ReactElement } from 'react';

import { Drawer, DrawerProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

const AppDrawer = (props: DrawerProps): ReactElement => {
    const classes = useStyles();

    return (
        <Drawer
            {...props}
            PaperProps={{
                className: props.className ? props.className : classes.root,
            }}
        >
            {props.children}
        </Drawer>
    );
};

export default AppDrawer;
