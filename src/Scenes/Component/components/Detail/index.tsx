import React, { ReactElement } from 'react';

import { makeStyles, useTheme } from '@material-ui/core';
import { IComponent } from 'GraphQL/Component/Detail';
import ComponentGraph from './components/Graph';
import NodePanel from './components/NodePanel';
import { Coordinate, IComponentEdits } from './types';
import {
    CreateNodeUnion,
    CreateNode_Mutation,
    ICreateNode_Args,
    ICreateNode_Res,
} from 'GraphQL/Component/Node';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import { getEdits } from './utils';
import { cloneDeep } from 'lodash';

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
    componentEdits: IComponentEdits;
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
        componentEdits: getEdits(component),
    });

    const panelState: IPanelProps = {
        open: state.showPanel,
        toggle: () => setState((s) => ({ ...s, showPanel: !s.showPanel })),
    };

    const editNode = (id: string, data: CreateNodeUnion) => {
        const index = state.componentEdits.nodes.map((n) => n.id).indexOf(id);
        if (index !== -1) {
            const copy = cloneDeep(state.componentEdits);
            copy.nodes[index] = data;
            setState((s) => ({ ...s, componentEdits: copy }));
        }
    };

    return (
        <div className={classes.root}>
            <ComponentGraph
                editNode={editNode}
                componentEdits={state.componentEdits}
                component={component}
                panelState={panelState}
            />
            <NodePanel component={component} panelState={panelState} />
        </div>
    );
};

export default ComponentDetail;
