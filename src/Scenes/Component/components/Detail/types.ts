import {
    IBooleanNode,
    IComponentNode,
    IDeltaNode,
    ILogicNode,
    INumberNode,
    IProductNode,
    IStringNode,
    ISumNode,
} from 'GraphQL/Component/Detail';
import { CreateNodeUnion } from 'GraphQL/Component/Node';

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

export interface IComponentEdits {
    id: string;
    name: string;
    description: string | null;
    nodes: CreateNodeUnion[];
    captures: Capture[];
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface Capture extends Coordinate {
    elementID: string;
}
