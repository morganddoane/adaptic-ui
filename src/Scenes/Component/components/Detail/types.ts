import { getInputHandleID } from 'Components/Graph/types';
import {
    IBooleanNode,
    IComponentNode,
    IDeltaNode,
    IEdge,
    ILogicNode,
    INumberNode,
    IProductNode,
    IStringNode,
    ISumNode,
} from 'GraphQL/Component/Detail';
import { CreateNodeUnion } from 'GraphQL/Component/Node';
import { ICreateNodeInput } from 'GraphQL/Component/Update';

export type BooleanNode = Omit<IBooleanNode, 'booleanValue' | 'state'>;
export type ComponentNode = Omit<IComponentNode, 'state'>;
export type DeltaNode = Omit<IDeltaNode, 'booleanValue' | 'state'>;
export type LogicNode = Omit<ILogicNode, 'logicValue' | 'state'>;
export type NumberNode = Omit<INumberNode, 'numberValue' | 'state'>;
export type ProductNode = Omit<IProductNode, 'productValue' | 'state'>;
export type StringNode = Omit<IStringNode, 'stringValue' | 'state'>;
export type SumNode = Omit<ISumNode, 'sumValue' | 'state'>;

export type ComponentNodeData =
    | BooleanNode
    | ComponentNode
    | DeltaNode
    | LogicNode
    | NumberNode
    | ProductNode
    | StringNode
    | SumNode;

export const getNodeEdges = (node: CreateNodeUnion): IEdge[] => {
    const nodeEdges = [];
    switch (node.__typename) {
        case 'BooleanNode':
            if (node.inputID)
                nodeEdges.push({
                    from: node.inputID,
                    to: node.id,
                    property: 'input',
                });
            break;
        case 'ComponentNode':
            break;
        case 'DeltaNode':
            if (node.subtrahendID)
                nodeEdges.push({
                    from: node.subtrahendID,
                    to: node.id,
                    property: 'subtrahend',
                });
            if (node.minuendID)
                nodeEdges.push({
                    from: node.minuendID,
                    to: node.id,
                    property: 'minuend',
                });
            break;
        case 'LogicNode':
            if (node.ifID)
                nodeEdges.push({
                    from: node.ifID,
                    to: node.id,
                    property: 'if',
                });
            if (node.thenID)
                nodeEdges.push({
                    from: node.thenID,
                    to: node.id,
                    property: 'then',
                });
            if (node.elseID)
                nodeEdges.push({
                    from: node.elseID,
                    to: node.id,
                    property: 'else',
                });
            break;
        case 'NumberNode':
            if (node.inputID)
                nodeEdges.push({
                    from: node.inputID,
                    to: node.id,
                    property: 'input',
                });
            break;
        case 'ProductNode':
            for (const input of node.inputIDs) {
                nodeEdges.push({
                    from: input,
                    to: node.id,
                    property: 'inputs',
                });
            }
            break;
        case 'StringNode':
            if (node.inputID)
                nodeEdges.push({
                    from: node.inputID,
                    to: node.id,
                    property: 'input',
                });
            break;
        case 'SumNode':
            for (const input of node.inputIDs) {
                nodeEdges.push({
                    from: input,
                    to: node.id,
                    property: 'inputs',
                });
            }
            break;
    }
    return nodeEdges;
};

export class ComponentEdits {
    id: string;
    name: string;
    description: string | null;
    nodes: CreateNodeUnion[];
    captures: Capture[];

    constructor(
        id: string,
        name: string,
        description: string | null,
        nodes: CreateNodeUnion[],
        captures: Capture[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.nodes = nodes;
        this.captures = captures;
    }

    get edges(): IEdge[] {
        return this.nodes
            .map((n) => getNodeEdges(n))
            .flat(1)
            .map((edge) => ({
                from: edge.from,
                to: edge.to,
                property: edge.property,
            }));
    }
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface Capture extends Coordinate {
    elementID: string;
}

export const convertNodeUnion = (node: CreateNodeUnion): ICreateNodeInput => {
    switch (node.__typename) {
        case 'BooleanNode': {
            const { id, defaultValue, label, abstract, output } = node;
            return {
                Boolean: { id, defaultValue, label, abstract, output },
            };
        }
        case 'ComponentNode': {
            const { id, componentID, label, abstract, output } = node;
            return {
                Component: {
                    id,
                    label,
                    abstract,
                    output,
                },
            };
        }
        case 'DeltaNode': {
            const {
                id,
                label,
                abstract,
                output,
                minuendID,
                subtrahendID,
            } = node;
            return {
                Delta: {
                    id,
                    label,
                    abstract,
                    output,
                    minuendID,
                    subtrahendID,
                },
            };
        }
        case 'LogicNode': {
            const { id, label, abstract, output, ifID, thenID, elseID } = node;
            return {
                Logic: {
                    id,
                    label,
                    abstract,
                    output,
                    ifID,
                    thenID,
                    elseID,
                },
            };
        }
        case 'NumberNode': {
            const { id, label, abstract, output, inputID, defaultValue } = node;
            return {
                Number: {
                    id,
                    label,
                    abstract,
                    output,
                    inputID,
                    defaultValue,
                },
            };
        }
        case 'ProductNode': {
            const { id, label, abstract, output, inputIDs } = node;
            return {
                Product: {
                    id,
                    label,
                    abstract,
                    output,
                    inputIDs,
                },
            };
        }
        case 'StringNode': {
            const { id, label, abstract, output, inputID, defaultValue } = node;
            return {
                String: {
                    id,
                    label,
                    abstract,
                    output,
                    inputID,
                    defaultValue,
                },
            };
        }
        case 'SumNode': {
            const { id, label, abstract, output, inputIDs } = node;
            return {
                Sum: {
                    id,
                    label,
                    abstract,
                    output,
                    inputIDs,
                },
            };
        }
    }
};
