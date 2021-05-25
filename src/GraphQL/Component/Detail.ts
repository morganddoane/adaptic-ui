import { IPerson } from './../Home/Teams';
import { gql } from '@apollo/client';

export const ComponentQuery = gql`
    query($id: String!) {
        component(id: $id) {
            id
            name
            dateCreated
            dateModified
            description
            nodeCount
            createdBy {
                id
                first
                last
                full
                email
            }
            project {
                id
                name
            }
            nodes {
                __typename
                ... on BooleanNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    defaultBoolean: defaultValue
                    booleanInputID: inputID
                    booleanValue: value
                }
                ... on ComponentNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    component {
                        id
                        name
                    }
                }
                ... on DeltaNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    minuendID
                    subtrahendID
                    deltaValue: value
                }
                ... on LogicNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    ifID
                    thenID
                    elseID
                    logicValue: value {
                        __typename
                        ... on BooleanNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            defaultBoolean: defaultValue
                            booleanInputID: inputID
                            booleanValue: value
                        }
                        ... on ComponentNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            component {
                                id
                                name
                            }
                        }
                        ... on DeltaNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            minuendID
                            subtrahendID
                            deltaValue: value
                        }
                        ... on LogicNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            ifID
                            thenID
                            elseID
                            logicValue: value {
                                __typename
                            }
                        }
                        ... on NumberNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            defaultNumber: defaultValue
                            inputID
                            numberValue: value
                        }
                        ... on ProductNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            productInputIDs: inputIDs
                            productValue: value
                        }
                        ... on StringNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            value
                            defaultValue
                        }
                        ... on SumNode {
                            id
                            state
                            class
                            label
                            abstract
                            output
                            sumInputIDs: inputIDs
                            sumValue: value
                        }
                    }
                }
                ... on NumberNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    defaultNumber: defaultValue
                    inputID
                    numberValue: value
                }
                ... on ProductNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    productInputIDs: inputIDs
                    productValue: value
                }
                ... on StringNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    value
                    defaultValue
                }
                ... on SumNode {
                    id
                    state
                    class
                    label
                    abstract
                    output
                    sumInputIDs: inputIDs
                    sumValue: value
                }
            }
            edges {
                from
                to
            }
        }
    }
`;

export interface ICompoentQuery_Res {
    component: IComponent | null;
}

export interface ICompoentQuery_Args {
    id: string;
}

export interface IComponent {
    id: string;
    name: string;
    dateCreated: Date;
    dateModified: Date;
    description: string | null;
    nodeCount: number;
    createdBy: IPerson;
    project: { id: string; name: string };
    nodes: NodeUnion[];
    edges: { from: string; to: string }[];
}

export enum NodeClass {
    Boolean = 'Boolean',
    Component = 'Component',
    Delta = 'Delta',
    Logic = 'Logic',
    Number = 'Number',
    Product = 'Product',
    String = 'String',
    Sum = 'Sum',
}

export enum NodeState {
    Resolved = 'Resolved',
    Pending = 'Pending',
    Circular = 'Circular',
    Error = 'Error',
}

interface INodeBase {
    id: string;
    state: NodeState;
    class: NodeClass;
    label: string | null;
    abstract: boolean;
    output: boolean;
}

export type NodeUnion =
    | IBooleanNode
    | IComponentNode
    | IDeltaNode
    | ILogicNode
    | INumberNode
    | IProductNode
    | IStringNode
    | ISumNode;

export interface IBooleanNode extends INodeBase {
    __typename: 'BooleanNode';
    defaultBoolean: boolean | null;
    booleanInputID: string | null;
    booleanValue: boolean | null;
}

export interface IComponentNode extends INodeBase {
    __typename: 'ComponentNode';
    component: {
        id: string;
        name: string;
    };
}

export interface IDeltaNode extends INodeBase {
    __typename: 'DeltaNode';
    minuendID: string | null;
    subtrahendID: string | null;
    deltaValue: number | null;
}

export interface ILogicNode extends INodeBase {
    __typename: 'LogicNode';
    ifID: string | null;
    thenID: string | null;
    elseID: string | null;
    logicValue: NodeUnion | null;
}

export interface INumberNode extends INodeBase {
    __typename: 'NumberNode';
    defaultNumber: number | null;
    inputID: string | null;
    numberValue: number | null;
}

export interface IProductNode extends INodeBase {
    __typename: 'ProductNode';
    productInputIDs: string[];
    productValue: number | null;
}

export interface IStringNode extends INodeBase {
    __typename: 'StringNode';
    value: string | null;
    defaultValue: string | null;
}

export interface ISumNode extends INodeBase {
    __typename: 'SumNode';
    sumInputIDs: string[];
    sumValue: number | null;
}
