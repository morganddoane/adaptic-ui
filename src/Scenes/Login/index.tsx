import React, { ReactElement } from 'react';

import {
    Button,
    CircularProgress,
    makeStyles,
    TextField,
    Typography,
    useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import Anima, { AnimaType } from 'Components/Misc/Anima/Anima';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import {
    LoginQuery_Args,
    LoginQuery_Res,
    Login_Query,
} from 'GraphQL/Auth/queries';
import { isSuspensionError, isVerificationError } from 'utils/errors';
import Verification from './components/Verification';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        maxHeight: '-webkit-fill-available',
        position: 'relative',
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
    },
    left: {
        width: theme.spacing(6),
    },
    lineWrap: {},
    line: {
        width: 4,
        height: 0,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        background: theme.palette.primary.main,
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.short,
        }),
    },
    lineIn: {
        height: '65vh',
    },
    content: {
        padding: theme.spacing(8),
        zIndex: 10,
    },
    formWrap: {
        width: 350,
    },
}));

const Login = (): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = React.useState({
        in: false,
        method: '',
        password: '',
        incorrect: false,
        verification: false,
    });

    const [attemptLogin, { data, error, loading }] = useArtemisMutation<
        LoginQuery_Res,
        LoginQuery_Args
    >(Login_Query, {
        variables: {
            method: state.method,
            password: state.password,
        },
    });

    React.useEffect(() => {
        if (data && data.login) {
            location.reload();
        }
    }, [data]);

    React.useEffect(() => {
        if (error) {
            if (isVerificationError(error)) {
                setState((s) => ({ ...s, verification: true }));
            } else if (isSuspensionError(error)) {
                enqueueSnackbar(error.message, { variant: 'error' });
            } else {
                setState((s) => ({ ...s, incorrect: true }));
            }
        }
    }, [error, enqueueSnackbar]);

    const Br = () => <div style={{ height: theme.spacing(1) }} />;

    const edit = (field: 'method' | 'password', value: string) => {
        setState((s) => ({ ...s, [field]: value, incorrect: false }));
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setState((s) => ({ ...s, in: true }));
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.left}></div>
            <div className={classes.lineWrap}>
                <div
                    className={clsx(classes.line, {
                        [classes.lineIn]: state.in && !state.verification,
                    })}
                ></div>
            </div>
            <div className={classes.content}>
                <Anima
                    in={state.in && !state.verification}
                    type={AnimaType.GrowLeft}
                >
                    <div>
                        <Typography variant="h4">Adaptic</Typography>
                        <Br />
                        <Br />
                        <Typography variant="h3">
                            Collaborative design automation
                        </Typography>
                        <Br />
                        <Br />
                        <Br />
                        <Typography color="textSecondary" variant="body1">
                            Adaptic allows engineering teams to seamlessly
                            coordinate their design practice.
                        </Typography>
                        <Br />
                        <Br />
                        <Br />
                        <Typography variant="caption">Login</Typography>
                        <Br />
                        <div className={classes.formWrap}>
                            <TextField
                                variant="outlined"
                                placeholder="Username, email, or phone"
                                fullWidth
                                error={state.incorrect}
                                value={state.method}
                                onChange={(e) => {
                                    edit('method', e.target.value);
                                }}
                            />
                            <Br />
                            <Br />
                            <TextField
                                variant="outlined"
                                placeholder="Password"
                                type="password"
                                fullWidth
                                error={state.incorrect}
                                value={state.password}
                                onChange={(e) => {
                                    edit('password', e.target.value);
                                }}
                            />
                            <Br />
                            <Br />
                            <Button
                                onClick={() => attemptLogin()}
                                fullWidth
                                color="primary"
                                variant="contained"
                                size="large"
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress
                                        style={{ height: 20, width: 20 }}
                                    />
                                ) : (
                                    'Send it!'
                                )}
                            </Button>
                        </div>
                    </div>
                </Anima>
            </div>
            <Verification
                method={state.method}
                password={state.password}
                in={state.verification}
            />
        </div>
    );
};

export default Login;
