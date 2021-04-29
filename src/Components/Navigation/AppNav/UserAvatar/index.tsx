import React, { ReactElement } from 'react';

import {
    Avatar,
    Button,
    ButtonBase,
    ClickAwayListener,
    Collapse,
    Fade,
    makeStyles,
    Typography,
    useTheme,
} from '@material-ui/core';
import { useAppDataProvider } from 'auth/providers/AppDataProvider';
import clsx from 'clsx';

import { MdExitToApp } from 'react-icons/md';
import { useHistory } from 'react-router';

const animation = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        right: 0,
        top: 0,
        transition: theme.transitions.create('all', { duration: animation }),
        background: 'rgba(0,0,0,0)',
        width: 32,
        boxShadow: theme.shadows[0],
        padding: 0,
        overflow: 'hidden',
        color: theme.palette.text.primary,
    },
    expanded: {
        background: theme.palette.background.default,
        width: 200,
        boxShadow: theme.shadows[4],
        padding: theme.spacing(2),
    },
    avatar: {
        background: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        height: 32,
        width: 32,
        fontSize: '1rem',
        boxShadow: theme.shadows[4],
    },
    name: {
        flex: 1,
        transition: theme.transitions.create('all'),
        opacity: 1,
        paddingLeft: theme.spacing(2),
    },
    fade: {
        opacity: 0,
    },
}));

enum Motion {
    Open = 'Open',
    Opening = 'Opening',
    Closed = 'Closed',
    Closing = 'Closing',
}

const UserAvatar = (): ReactElement | null => {
    const classes = useStyles();
    const { user } = useAppDataProvider();
    const theme = useTheme();
    const history = useHistory();

    const [state, setState] = React.useState<{ motion: Motion }>({
        motion: Motion.Closed,
    });

    React.useEffect(() => {
        if (state.motion === Motion.Opening) {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, motion: Motion.Open }));
            }, animation);

            return () => clearTimeout(timeout);
        } else if (state.motion === Motion.Closing) {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, motion: Motion.Closed }));
            }, animation);

            return () => clearTimeout(timeout);
        }
    }, [state.motion]);

    if (!user) return null;

    const Btn = (props: { children: ReactElement }) => (
        <ButtonBase
            onClick={() => setState((s) => ({ ...s, motion: Motion.Opening }))}
        >
            {props.children}
        </ButtonBase>
    );

    const Div = (props: { children: ReactElement }) => (
        <div>{props.children}</div>
    );

    const Wrap = state.motion === Motion.Closed ? Btn : Div;

    return (
        <ClickAwayListener
            onClickAway={() =>
                setState((s) => ({ ...s, motion: Motion.Closing }))
            }
        >
            <div
                className={clsx(classes.root, {
                    [classes.expanded]: [Motion.Opening, Motion.Open].includes(
                        state.motion
                    ),
                })}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Wrap>
                        <Avatar className={classes.avatar}>
                            {user.first[0] + user.last[0]}
                        </Avatar>
                    </Wrap>
                    <div
                        className={clsx(classes.name, {
                            [classes.fade]: state.motion !== Motion.Open,
                        })}
                    >
                        <Typography noWrap>{user.full}</Typography>
                    </div>
                </div>
                <Collapse
                    timeout={animation}
                    in={[Motion.Open, Motion.Opening].includes(state.motion)}
                >
                    <div style={{ paddingTop: theme.spacing(2) }}>
                        <Fade in={state.motion === Motion.Open}>
                            <Button
                                startIcon={<MdExitToApp />}
                                variant="outlined"
                                fullWidth
                                onClick={() => history.push('/logout')}
                            >
                                Logout
                            </Button>
                        </Fade>
                    </div>
                </Collapse>
            </div>
        </ClickAwayListener>
    );
};

export default UserAvatar;
