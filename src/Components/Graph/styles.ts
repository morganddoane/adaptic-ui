import { makeStyles } from '@material-ui/core';

export const useNodeStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.radius(1),
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
    },
    header: {
        padding: theme.spacing(2),
    },
    title: {
        maxWidth: 100,
        marginRight: theme.spacing(2),
    },
    body: {
        display: 'flex',
    },
    bodySection: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
    },
    value: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontSize: '2rem',
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    input: {
        padding: theme.spacing(2),
        position: 'relative',
    },
    output: {
        padding: theme.spacing(2),
        position: 'relative',
    },
    footer: {
        padding: theme.spacing(2),
    },
}));
