import React, { ReactElement } from 'react';
import ReactFlow, { Node } from 'react-flow-renderer';

import { makeStyles, useTheme } from '@material-ui/core';
import { nodeTypes, RenderNodeData } from 'Components/Graph/types';
import { IComponentEdits } from 'Scenes/Component/components/Detail/types';
import { CreateNodeUnion } from 'GraphQL/Component/Node';

const useStyles = makeStyles((theme) => ({
    root: { height: '100%', color: theme.palette.text.primary },
}));

const GraphRender = (props: {
    edits: IComponentEdits;
    editNode: (id: string, data: CreateNodeUnion) => void;
}): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { edits, editNode } = props;

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

    return (
        <div className={classes.root}>
            <ReactFlow elements={nodeElements} nodeTypes={nodeTypes} />
        </div>
    );
};

export default GraphRender;
