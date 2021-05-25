import React, { ReactElement } from 'react';

import { makeStyles, useTheme } from '@material-ui/core';
import { IComponent } from 'GraphQL/Component/Detail';
import ComponentGraph from './components/Graph';
import NodePanel from './components/NodePanel';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundImage: `radial-gradient(${theme.palette.action.hover} 1px, transparent 0)`,
        backgroundSize: `40px 40px`,
        backgroundPosition: `-19px -19px`,
        display: 'flex',
    },
}));

interface IComponentState {
    showPanel: boolean;
}

export interface IPanelProps {
    open: boolean;
    toggle: () => void;
}

const ComponentDetail = (props: { component: IComponent }): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { component } = props;

    const [state, setState] = React.useState<IComponentState>({
        showPanel: true,
    });
    const panelState: IPanelProps = {
        open: state.showPanel,
        toggle: () => setState((s) => ({ ...s, showPanel: !s.showPanel })),
    };

    return (
        <div className={classes.root}>
            <ComponentGraph component={component} panelState={panelState} />
            <NodePanel component={component} panelState={panelState} />
        </div>
    );
};

export default ComponentDetail;
