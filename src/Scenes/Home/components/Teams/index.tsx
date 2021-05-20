import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Teams = (): ReactElement => {
    const classes = useStyles();
    return <div className={classes.root}></div>;
};
