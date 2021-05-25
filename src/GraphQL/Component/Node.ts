import { gql } from '@apollo/client';
import { IComponent, NodeState } from './Detail';

export const CreateNode_Mutation = gql`
    mutation createNode($componentID: String!, $data: CreateNodeInput!) {
        createNode(componentID: $componentID, data: $data)
    }
`;

export interface ICreateNode_Res {
    createNode: IComponent;
}

export interface ICreateNode_Args {
    componentID: string;
    data: {
        Boolean?: ICreateBooleanNode;
        Component?: ICreateComponentNode;
        Delta?: ICreateDeltaNode;
        Logic?: ICreateLogicNode;
        Number?: ICreateNumberNode;
        Product?: ICreateProductNode;
        Sum?: ICreateSumNode;
        String?: ICreateStringNode;
        location: {
            x: number;
            y: number;
        };
    };
}

export interface ICreateNodeBase {
    id: string;
    label?: string | null;
    abstract: boolean;
    output: boolean;
    state: NodeState;
}

export type CreateNodeUnion =
    | ICreateBooleanNode
    | ICreateComponentNode
    | ICreateDeltaNode
    | ICreateLogicNode
    | ICreateNumberNode
    | ICreateProductNode
    | ICreateSumNode
    | ICreateStringNode;

export interface ICreateBooleanNode extends ICreateNodeBase {
    __typename: 'BooleanNode';
    defaultValue?: boolean;
    inputID?: string | null;
    value?: boolean | null;
}

export interface ICreateComponentNode extends ICreateNodeBase {
    __typename: 'ComponentNode';
    componentID: string;
}

export interface ICreateDeltaNode extends ICreateNodeBase {
    __typename: 'DeltaNode';
    minuendID?: string | null;
    subtrahendID?: string | null;
    value?: number | null;
}

export interface ICreateLogicNode extends ICreateNodeBase {
    __typename: 'LogicNode';
    ifID?: string | null;
    thenID?: string | null;
    elseID?: string | null;
}

export interface ICreateNumberNode extends ICreateNodeBase {
    __typename: 'NumberNode';
    defaultValue?: number | null;
    inputID?: string | null;
    value?: number | null;
}

export interface ICreateProductNode extends ICreateNodeBase {
    __typename: 'ProductNode';
    inputIDs: string[];
    value?: number | null;
}

export interface ICreateSumNode extends ICreateNodeBase {
    __typename: 'SumNode';
    inputIDs: string[];
    value?: number | null;
}

export interface ICreateStringNode extends ICreateNodeBase {
    __typename: 'StringNode';
    defaultValue?: string | null;
    inputID?: string | null;
    value?: string | null;
}
