import React, { ReactElement } from 'react';

import { makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import {
    LoginQuery_Res,
    VerifyQuery_Args,
    Verify_Query,
} from 'GraphQL/Auth/queries';
import { isVerificationError } from 'utils/errors';
import CodeInput from 'Components/Inputs/CodeInput.ts';

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
    });

    const [attemptVerification, { data, error, loading }] = useArtemisMutation<
        LoginQuery_Res,
        VerifyQuery_Args
    >(Verify_Query, {
        variables: {
            method: method,
            password: password,
            code: state.code,
        },
    });

    React.useEffect(() => {
        if (state.code.length === 6) {
            attemptVerification();
        }
    }, [state.code, attemptVerification]);

    return (
        <div className={clsx(classes.root, { [classes.in]: props.in })}>
            <CodeInput
                value={state.code}
                onChange={(val) => setState({ ...state, code: val })}
            />
        </div>
    );
};

export default Verification;
