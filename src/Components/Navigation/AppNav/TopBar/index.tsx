import React, { ReactElement, useState } from 'react';

import {
    ButtonBase,
    makeStyles,
    Typography,
    useTheme,
} from '@material-ui/core';
import { useAppDataProvider } from 'auth/providers/AppDataProvider';
import { ReactComponent as Logo } from 'Media/logo.svg';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.background.paper,
        padding: theme.spacing(1.5),
        boxShadow: theme.shadows[4],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
    },
}));

const TopBar = (props: { children?: ReactElement | null }): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const { user } = useAppDataProvider();
    return (
        <div className={classes.root}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <ButtonBase
                    onClick={() => {
                        history.push('/');
                    }}
                    style={{
                        boxShadow: theme.shadows[4],
                        marginRight: theme.spacing(2),
                    }}
                >
                    <Logo style={{ height: 32 }} />
                </ButtonBase>

                <Typography color="textPrimary" variant="h5">
                    Adaptic
                </Typography>
            </div>
            <div
                style={{
                    position: 'relative',
                    height: '100%',
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

export default TopBar;
