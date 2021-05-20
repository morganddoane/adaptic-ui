import React, { ReactElement } from 'react';

import { Fab, Grow, makeStyles } from '@material-ui/core';
import { MdAdd } from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    wrap: {
        flex: 1,
        overflow: 'auto',
    },
}));

const Teams = (): ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrap}></div>
        </div>
    );
};

export default Teams;
