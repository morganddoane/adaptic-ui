import React, { ReactElement } from 'react';

import {
    Button,
    CircularProgress,
    makeStyles,
    Typography,
    useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import {
    LoginQuery_Res,
    ResendQuery_Args,
    ResendQuery_Res,
    Resend_Query,
    VerifyQuery_Args,
    VerifyQuery_Res,
    Verify_Query,
} from 'GraphQL/Auth/queries';
import { isSuspensionError, isVerificationError } from 'utils/errors';
import CodeInput from 'Components/Inputs/CodeInput.ts';
import { useHistory } from 'react-router';
import LottieAnimation, {
    LottieAnimationType,
} from 'Components/Feedback/LottieAnimation';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        opacity: 0,
        transition: theme.transitions.create('all', {
            duration: 250,
            delay: 500,
        }),
    },
    in: {
        opacity: 1,
        zIndex: 10,
    },
}));

const Verification = (props: {
    in: boolean;
    method: string;
    password: string;
}): ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const { method, password } = props;
    const { enqueueSnackbar } = useSnackbar();

    const [state, setState] = React.useState({
        code: '',
        done: false,
        animate: false,
        resent: false,
        suspended: false,
    });

    React.useEffect(() => {
        if (state.done) {
            const timeout = setTimeout(() => {
                location.reload();
            }, 350);

            return () => clearTimeout(timeout);
        }
    }, [state.done]);

    React.useEffect(() => {
        if (props.in) {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, animate: true }));
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [props.in]);

    const [
        attemptVerification,
        { data, error, loading, called, reset },
    ] = useArtemisMutation<VerifyQuery_Res, VerifyQuery_Args>(Verify_Query, {
        variables: {
            method: method,
            password: password,
            code: state.code,
        },
    });

    const [
        resendVerification,
        { data: resendData, error: resendError, loading: resendLoading },
    ] = useArtemisMutation<ResendQuery_Res, ResendQuery_Args>(Resend_Query, {
        variables: {
            method: method,
            password: password,
        },
    });

    React.useEffect(() => {
        if (resendData) {
            setState((s) => ({ ...s, resent: true }));
        }
    }, [resendData]);

    React.useEffect(() => {
        if (error && isSuspensionError(error)) {
            setState((s) => ({ ...s, suspended: true }));
        } else if (resendError && isSuspensionError(resendError)) {
            setState((s) => ({ ...s, suspended: true }));
        }
    }, [error, resendError]);

    React.useEffect(() => {
        if (resendLoading) {
            setState((s) => ({ ...s, resent: false }));
        }
    }, [resendLoading]);

    React.useEffect(() => {
        if (state.code.length === 6 && !called) {
            attemptVerification();
        } else if (state.code.length < 6 && called) {
            reset();
        }
    }, [state.code, attemptVerification, called, reset]);

    React.useEffect(() => {
        if (data && data.verify) {
            setState((s) => ({ ...s, done: true }));
        }
    }, [data]);

    React.useEffect(() => {
        if (state.suspended) {
            enqueueSnackbar('User has been temporarily suspended', {
                variant: 'error',
            });
        }
    }, [state.suspended, enqueueSnackbar]);

    const Br = () => <div style={{ height: theme.spacing(2) }} />;

    return (
        <div
            className={clsx(classes.root, {
                [classes.in]: props.in && !state.done,
            })}
        >
            {state.animate && (
                <LottieAnimation animation={LottieAnimationType.Locked} />
            )}

            <Typography variant="h4">Account verification</Typography>
            <Br />
            <Br />
            <Typography color="textSecondary" variant="subtitle1">
                Please enter the code sent to your phone
            </Typography>
            <Br />
            <CodeInput
                value={state.code}
                onChange={(val) => setState({ ...state, code: val })}
            />
            <Br />
            <Br />
            <Button
                disabled={resendLoading || state.suspended}
                onClick={() => resendVerification()}
                color="primary"
                variant="outlined"
            >
                {loading ? (
                    <CircularProgress style={{ height: 18, width: 18 }} />
                ) : state.resent ? (
                    <LottieAnimation
                        animation={LottieAnimationType.Success}
                        height={22}
                        width={22}
                        onComplete={() =>
                            setState((s) => ({ ...s, resent: false }))
                        }
                        delay={1000}
                    />
                ) : (
                    'Resend'
                )}
            </Button>
        </div>
    );
};

export default Verification;
