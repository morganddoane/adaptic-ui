import React, { ReactElement } from 'react';

import { Button, makeStyles, Typography, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import {
    LoginQuery_Res,
    VerifyQuery_Args,
    VerifyQuery_Res,
    Verify_Query,
} from 'GraphQL/Auth/queries';
import { isVerificationError } from 'utils/errors';
import CodeInput from 'Components/Inputs/CodeInput.ts';
import { useHistory } from 'react-router';
import LottieAnimation, {
    LottieAnimationType,
} from 'Components/Feedback/LottieAnimation';

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

    const [state, setState] = React.useState({
        code: '',
        done: false,
        animate: false,
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
            <Button color="primary" variant="outlined">
                Resend
            </Button>
        </div>
    );
};

export default Verification;
