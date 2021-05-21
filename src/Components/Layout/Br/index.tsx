import { useTheme } from '@material-ui/core';
import React, { ReactElement } from 'react';

const Br = (props: { space?: number }): ReactElement => {
    const theme = useTheme();
    return (
        <div style={{ height: theme.spacing(props.space ? props.space : 2) }} />
    );
};
export default Br;
