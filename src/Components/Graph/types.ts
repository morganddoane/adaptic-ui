import { NodeClass, NodeUnion } from 'GraphQL/Component/Detail';
import { CreateNodeUnion } from 'GraphQL/Component/Node';
import { ReactElement } from 'react';
import BooleanNode from './Nodes/BooleanNode';
import ComponentNode from './Nodes/ComponentNode';
import DeltaNode from './Nodes/DeltaNode';
import LogicNode from './Nodes/LogicNode';
import NumberNode from './Nodes/NumberNode';
import ProductNode from './Nodes/ProductNode';
import StringNode from './Nodes/StringNode';
import SumNode from './Nodes/SumNode';

export interface RenderNodeData {
    node: CreateNodeUnion;
    update: (id: string, data: CreateNodeUnion) => void;
}

export interface RenderNodeProps {
    data: RenderNodeData;
}

export const nodeTypes: Record<
    NodeClass,
    (props: { data: RenderNodeData }) => ReactElement
> = {
    [NodeClass.Boolean]: BooleanNode,
    [NodeClass.Component]: ComponentNode,
    [NodeClass.Delta]: DeltaNode,
    [NodeClass.Logic]: LogicNode,
    [NodeClass.Number]: NumberNode,
    [NodeClass.Product]: ProductNode,
    [NodeClass.String]: StringNode,
    [NodeClass.Sum]: SumNode,
};

export const getHandleId = (
    nodeId: string,
    type: 'In' | 'Out',
    parentId?: string
): string => {
    return `${type}_${nodeId}${parentId ? '_' + parentId : ''}`;
};
