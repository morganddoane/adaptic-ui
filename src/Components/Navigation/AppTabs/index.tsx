import React, { ReactElement } from 'react';
import { Tab, TabProps, Tabs, TabsProps, withStyles } from '@material-ui/core';

export const AppTabs = withStyles({
    root: {},
})((props: TabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            color: 'primary',
            style:
                props.orientation == 'vertical'
                    ? {
                          left: 0,
                          width: 4,
                          borderRadius: 4,
                      }
                    : {
                          height: 4,
                          borderRadius: 4,
                      },
        }}
    />
));

const VerticalTab = withStyles((theme) => ({
    root: {
        padding: '0px 12px',
        minHeight: 36,
        fontSize: '1.1rem',
        transition: theme.transitions.create('all', {
            duration: 200,
        }),
        fill: theme.palette.text.secondary,
    },
    selected: {
        padding: '0px 16px',
        fill: theme.palette.text.primary,
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'flex-start',
        '& .MuiSvgIcon-root, .appIcon': {
            paddingTop: 4,
            marginRight: theme.spacing(1),
        },
    },
}))((props: TabProps) => <Tab disableRipple {...props} />);

const HorizontalTab = withStyles((theme) => ({
    root: {
        minHeight: 36,
        fontSize: '1.1rem',
        transition: theme.transitions.create('all', {
            duration: 200,
        }),
        fill: theme.palette.text.secondary,
    },
    selected: { fill: theme.palette.text.primary },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'row',
        '& .MuiSvgIcon-root, .appIcon': {
            paddingTop: 4,
            marginRight: theme.spacing(1),
        },
    },
}))((props: TabProps) => <Tab disableRipple {...props} />);

interface AppTabProps extends TabProps {
    orientation?: 'vertical' | 'horizontal' | undefined;
}

export const AppTab = (props: AppTabProps): ReactElement => {
    const Comp = props.orientation == 'vertical' ? VerticalTab : HorizontalTab;

    return <Comp {...props}>{props.children}</Comp>;
};
