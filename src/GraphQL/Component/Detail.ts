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
            nodes {
                __typename
                ... on BooleanNode {
                    id
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
                            booleanValue: value
                        }
                        ... on ComponentNode {
                            component {
                                id
                                name
                            }
                        }
                        ... on DeltaNode {
                            deltaValue: value
                        }
                        ... on LogicNode {
                            logicValue: value {
                                __typename
                            }
                        }
                        ... on NumberNode {
                            numberValue: value
                        }
                        ... on ProductNode {
                            productValue: value
                        }
                        ... on StringNode {
                            stringValue: value
                        }
                        ... on SumNode {
                            sumValue: value
                        }
                    }
                }
                ... on NumberNode {
                    id
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
                    class
                    label
                    abstract
                    output
                    productInputIDs: inputIDs
                    productValue: value
                }
                ... on StringNode {
                    id
                    class
                    label
                    abstract
                    output
                    value
                    defaultValue
                }
                ... on SumNode {
                    id
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
    nodes: NodeUnion[];
    edges: { from: string; to: string }[];
}

export enum NodeClass {
    Boolean = 'Boolean',
}

interface INodeBase {
    id: string;
    class: NodeClass;
    label: string | null;
    abstract: boolean;
    output: boolean;
}

export type NodeUnion = IBooleanNode | IComponentNode;

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
