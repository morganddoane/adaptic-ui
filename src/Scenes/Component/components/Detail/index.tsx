import React, { ReactElement } from 'react';

import { Button, makeStyles, useTheme } from '@material-ui/core';
import { IComponent, NodeClass, NodeState } from 'GraphQL/Component/Detail';
import ComponentGraph from './components/Graph';
import { ComponentEdits, convertNodeUnion } from './types';
import { CreateNodeUnion } from 'GraphQL/Component/Node';
import { getEdits } from './utils';
import { cloneDeep } from 'lodash';
import { genTempId } from 'utils/functions';
import { useArtemisMutation } from 'utils/hooks/artemisHooks';
import {
    IUpdateComponent_Args,
    IUpdateComponent_Res,
    UpdateComponent_Mutation,
} from 'GraphQL/Component/Update';

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
    componentEdits: ComponentEdits;
    timer: number;
}

export interface IPanelProps {
    open: boolean;
    toggle: () => void;
}

const updateInterval = 5000;

const ComponentDetail = (props: { component: IComponent }): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { component } = props;

    const [state, setState] = React.useState<IComponentState>({
        showPanel: true,
        componentEdits: getEdits(component),
        timer: updateInterval,
    });

    const [
        updateComponent,
        { data, error, loading, called, reset },
    ] = useArtemisMutation<IUpdateComponent_Res, IUpdateComponent_Args>(
        UpdateComponent_Mutation
    );

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (state.timer !== 0)
                setState((s) => ({
                    ...s,
                    timer: s.timer - updateInterval / 5,
                }));
        }, updateInterval / 5);

        return () => clearInterval(interval);
    }, [state.timer]);

    React.useEffect(() => {
        setState((s) => ({ ...s, timer: updateInterval }));
    }, [state.componentEdits]);

    React.useEffect(() => {
        if (state.timer === 0 && !called) {
            updateComponent({
                variables: {
                    id: component.id,
                    data: {
                        nodes: state.componentEdits.nodes.map((node) =>
                            convertNodeUnion(node)
                        ),
                    },
                },
            });
        }
    }, [state.timer, updateComponent, called]);

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

    const addNode = (
        nodeClass: NodeClass,
        position: { x: number; y: number }
    ) => {
        const copy = cloneDeep(state.componentEdits);
        const id = genTempId();
        switch (nodeClass) {
            case NodeClass.Boolean: {
                copy.nodes.push({
                    __typename: 'BooleanNode',
                    id: id,
                    abstract: true,
                    output: false,
                    state: NodeState.Pending,
                });
                break;
            }
            case NodeClass.Logic: {
                copy.nodes.push({
                    __typename: 'LogicNode',
                    id: id,
                    abstract: true,
                    output: false,
                    state: NodeState.Pending,
                });
                break;
            }
            case NodeClass.Number: {
                copy.nodes.push({
                    __typename: 'NumberNode',
                    id: id,
                    abstract: true,
                    output: false,
                    state: NodeState.Pending,
                });
                break;
            }
            case NodeClass.Product: {
                copy.nodes.push({
                    __typename: 'ProductNode',
                    id: id,
                    abstract: true,
                    output: false,
                    state: NodeState.Pending,
                    inputIDs: [],
                });
                break;
            }
            case NodeClass.String: {
                copy.nodes.push({
                    __typename: 'StringNode',
                    id: id,
                    abstract: true,
                    output: false,
                    state: NodeState.Pending,
                });
                break;
            }
            case NodeClass.Sum: {
                copy.nodes.push({
                    __typename: 'SumNode',
                    id: id,
                    abstract: true,
                    output: false,
                    state: NodeState.Pending,
                    inputIDs: [],
                });
                break;
            }
        }

        copy.captures.push({ elementID: id, ...position });

        setState((s) => ({ ...s, componentEdits: copy }));
    };

    return (
        <div className={classes.root}>
            <ComponentGraph
                editNode={editNode}
                componentEdits={state.componentEdits}
                component={component}
                panelState={panelState}
                addNode={addNode}
            />
            <h1>{state.timer}</h1>
        </div>
    );
};

export default ComponentDetail;
