import React, { ReactElement } from 'react';

import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { flexCenter } from 'Theme/Theme';
import LottieAnimation, { LottieAnimationType } from '../LottieAnimation';

const useStyles = makeStyles((theme) => ({
    root: {
        ...flexCenter,
    },
}));

const Status = (props: {
    status: 'NoData' | 'Error';
    message?: string;
}): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();

    const { status, message } = props;

    const animationType = (): LottieAnimationType => {
        switch (status) {
            case 'Error':
                return LottieAnimationType.Error;
            case 'NoData':
                return LottieAnimationType.Astron;
        }
    };

    const type = animationType();

    const shouldLoop = type == LottieAnimationType.Error ? false : true;

    return (
        <div className={classes.root}>
            <LottieAnimation loop={shouldLoop} animation={type} />
            <div style={{ height: theme.spacing(2) }} />
            {message && <Typography color="textPrimary">{message}</Typography>}
        </div>
    );
};

export default Status;
