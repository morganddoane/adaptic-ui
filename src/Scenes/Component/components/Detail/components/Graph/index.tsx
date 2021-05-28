import React, { ReactElement } from 'react';

import { Button, makeStyles, useTheme } from '@material-ui/core';
import { IComponent, NodeClass } from 'GraphQL/Component/Detail';
import { IPanelProps } from '../..';
import { ComponentEdits } from '../../types';
import { CreateNodeUnion } from 'GraphQL/Component/Node';
import {
    RenderNodeData,
    getInputHandleID,
    nodeTypes,
} from 'Components/Graph/types';
import ReactFlow, {
    OnLoadParams,
    Edge,
    ReactFlowProvider,
    Node,
} from 'react-flow-renderer';
import { genTempId } from 'utils/functions';
import NodePanel from './components/NodePanel';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
    },
    flowWrapper: {
        flex: 1,
    },
}));

const ComponentGraph = (props: {
    component: IComponent;
    panelState: IPanelProps;
    componentEdits: ComponentEdits;
    addNode: (nodeClass: NodeClass, position: { x: number; y: number }) => void;
    editNode: (id: string, data: CreateNodeUnion) => void;
}): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const {
        panelState,
        component,
        componentEdits: edits,
        editNode,
        addNode,
    } = props;

    const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
    const [
        reactFlowInstance,
        setReactFlowInstance,
    ] = React.useState<OnLoadParams<any> | null>(null);

    const onLoad = (_reactFlowInstance: OnLoadParams<any>) =>
        setReactFlowInstance(_reactFlowInstance);

    const transformNode = (
        node: CreateNodeUnion,
        location: { x: number; y: number }
    ): Node<RenderNodeData> => {
        return {
            id: node.id,
            type: node.__typename.replace('Node', ''),
            position: location,
            data: {
                node: node,
                update: (id: string, data: CreateNodeUnion) =>
                    editNode(id, data),
            },
        };
    };

    const nodeElements: Node<RenderNodeData>[] = edits.nodes.map((n) => {
        const location = edits.captures.find((cap) => cap.elementID === n.id);
        return transformNode(
            n,
            location ? { x: location.x, y: location.y } : { x: 100, y: 100 }
        );
    });

    const edgeElements: Edge[] = edits.edges.map((edge) => ({
        id: genTempId(),
        source: edge.from,
        target: edge.to,
        targetHandle: getInputHandleID(edge.to, edge.property),
    }));

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (
            reactFlowWrapper !== null &&
            reactFlowWrapper.current !== null &&
            reactFlowInstance !== null
        ) {
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const nodeClass = event.dataTransfer.getData(
                'application/reactflow'
            ) as NodeClass;
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            addNode(nodeClass, position);
        }
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    return (
        <ReactFlowProvider>
            <div className={classes.root}>
                <div className={classes.flowWrapper} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        elements={[...nodeElements, ...edgeElements]}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    ></ReactFlow>
                </div>
                <NodePanel panelState={panelState} component={component} />
            </div>
        </ReactFlowProvider>
    );
};

export default ComponentGraph;
