import React, { ReactElement } from 'react';

import { Fade } from '@material-ui/core';

const duration = 250;

const ViewFade = (props: {
    children: ReactElement[];
    index: number;
}): ReactElement => {
    const { children, index } = props;

    const [state, setState] = React.useState<{
        from: number;
        to: number;
        moving: boolean;
    }>({
        from: index,
        to: index,
        moving: false,
    });

    React.useEffect(() => {
        setState((s) => ({
            ...s,
            moving: true,
            from: s.to,
            to: index,
        }));
    }, [index]);

    React.useEffect(() => {
        if (state.moving) {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, moving: false }));
            }, duration);

            return () => clearTimeout(timeout);
        }
    }, [state.moving]);

    return (
        <Fade timeout={duration / 2} in={!state.moving}>
            {children[state.moving ? state.from : state.to]}
        </Fade>
    );
};

export default ViewFade;
