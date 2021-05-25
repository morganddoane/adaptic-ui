import React, { ReactElement } from 'react';

import { Fade, makeStyles, useTheme } from '@material-ui/core';
import { IPanelProps } from '../..';
import clsx from 'clsx';

import NodeList from './components/NodeList';
import { IComponent } from 'GraphQL/Component/Detail';
import { CreateNodeUnion } from 'GraphQL/Component/Node';
import { Coordinate } from '../../types';

const duration = 450;

const useStyles = makeStyles((theme) => ({
    root: {
        width: 0,
        background: theme.palette.background.paper,
        transition: theme.transitions.create('all', { duration: duration }),
    },
    open: {
        width: 340,
    },
}));

const NodePanel = (props: {
    panelState: IPanelProps;
    component: IComponent;
}): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { panelState, component } = props;

    const [state, setState] = React.useState<{
        motion: 'opening' | 'open' | 'closing' | 'closed';
    }>({
        motion: panelState.open == true ? 'opening' : 'closing',
    });

    React.useEffect(() => {
        if (panelState.open == true)
            setState((s) => ({ ...s, motion: 'opening' }));
        else setState((s) => ({ ...s, motion: 'closing' }));
    }, [panelState.open]);

    React.useEffect(() => {
        if (state.motion === 'opening') {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, motion: 'open' }));
            }, duration);

            return () => clearTimeout(timeout);
        }

        if (state.motion === 'closing') {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, motion: 'closed' }));
            }, duration);

            return () => clearTimeout(timeout);
        }
    }, [state.motion]);

    return (
        <div
            className={clsx(classes.root, {
                [classes.open]: ['opening', 'open'].includes(state.motion),
            })}
        >
            <Fade in={state.motion === 'open'}>
                <div>
                    <NodeList component={component} />
                </div>
            </Fade>
        </div>
    );
};

export default NodePanel;
