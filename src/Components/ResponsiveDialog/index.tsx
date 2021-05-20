import React, { ReactElement } from 'react';

import { useMediaQuery, useTheme } from '@material-ui/core';
import AppDrawer from './components/AppDrawer';
import AppDialog from './components/AppDialog';

const ResponsiveDialog = (props: {
    children: ReactElement;
    open: boolean;
    onClose: () => void;
    anchor?: 'bottom' | 'left' | 'right' | 'top';
}): ReactElement => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isMobile)
        return (
            <AppDrawer
                anchor={props.anchor ? props.anchor : 'bottom'}
                onClose={props.onClose}
                open={props.open}
            >
                {props.children}
            </AppDrawer>
        );
    else
        return (
            <AppDialog onClose={props.onClose} open={props.open}>
                {props.children}
            </AppDialog>
        );
};

export default ResponsiveDialog;
