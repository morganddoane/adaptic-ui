import { useTheme } from '@material-ui/core';
import React, { ReactElement } from 'react';

const Br = (props: { space?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }): ReactElement => {
    const theme = useTheme();
    return (
        <div style={{ height: theme.spacing(props.space ? props.space : 2) }} />
    );
};
export default Br;
