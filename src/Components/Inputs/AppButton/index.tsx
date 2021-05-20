import {
    Button,
    ButtonProps,
    CircularProgress,
    useTheme,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

export interface AppButtonProps extends ButtonProps {
    loading?: boolean;
}

const AppButton = (props: AppButtonProps): ReactElement => {
    const theme = useTheme();
    const { loading = false } = props;
    return (
        <Button disabled={Boolean(loading || props.disabled)} {...props}>
            {loading ? (
                <CircularProgress
                    style={{
                        height: 20,
                        width: 20,
                        color:
                            props.variant == 'contained' ? 'white' : undefined,
                    }}
                />
            ) : (
                props.children
            )}
        </Button>
    );
};
export default AppButton;
