import React, { ReactElement, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import UserAvatar from './UserAvatar';

const useStyles = (overflow = false) =>
    makeStyles((theme) => ({
        root: {
            height: '100vh',
            maxHeight: '-webkit-fill-available',
            position: 'relative',
            display: 'flex',
            flexFlow: 'column',
        },
        body: {
            flex: 1,
            overflow: overflow ? 'auto' : 'hidden',
        },
    }))();

const AppNav = (props: {
    children: ReactElement | ReactElement[];
    overflow?: boolean;
}): ReactElement => {
    const classes = useStyles(props.overflow);
    return (
        <div className={classes.root}>
            <TopBar>
                <UserAvatar />
            </TopBar>
            <div className={classes.body}>{props.children}</div>
        </div>
    );
};

export default AppNav;
