import { gql } from '@apollo/client';
import { IComponent } from './Detail';
import { CreateNodeUnion } from './Node';

export const UpdateComponent_Mutation = gql`
    mutation updateComponent($id: String!, $data: UpdateComponentInput!) {
        updateComponent(id: $id, data: $data) {
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
            captures {
                elementID
                x
                y
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
                property
            }
        }
    }
`;

export interface IUpdateComponent_Res {
    updateComponent: IComponent;
}

export interface IUpdateComponent_Args {
    id: string;
    data: {
        name?: string;
        description?: string;
        captures?: { x: number; y: number; z?: number; elementID: string }[];
        nodes?: ICreateNodeInput[];
    };
}

export interface ICreateNodeInput {
    Boolean?: ICreateBooleanNodeInput;
    Component?: ICreateComponentNodeInput;
    Delta?: ICreateDeltaNodeInput;
    Logic?: ICreateLogicNodeInput;
    Number?: ICreateNumberNodeInput;
    Product?: ICreateProductNodeInput;
    Sum?: ICreateSumNodeInput;
    String?: ICreateStringNodeInput;
}

export interface ICreateNodeBase {
    id?: string | null;
    label?: string | null;
    abstract: boolean;
    output: boolean;
}

export interface ICreateBooleanNodeInput extends ICreateNodeBase {
    defaultValue?: boolean | null;
    inputID?: string | null;
}

export interface ICreateComponentNodeInput extends ICreateNodeBase {
    defaultValue?: boolean;
}

export interface ICreateDeltaNodeInput extends ICreateNodeBase {
    minuendID?: string | null;
    subtrahendID?: string | null;
}

export interface ICreateLogicNodeInput extends ICreateNodeBase {
    ifID?: string | null;
    thenID?: string | null;
    elseID?: string | null;
}

export interface ICreateNumberNodeInput extends ICreateNodeBase {
    defaultValue?: number | null;
    inputID?: string | null;
}

export interface ICreateProductNodeInput extends ICreateNodeBase {
    inputIDs: string[];
}

export interface ICreateSumNodeInput extends ICreateNodeBase {
    inputIDs: string[];
}

export interface ICreateStringNodeInput extends ICreateNodeBase {
    defaultValue?: string | null;
    inputID?: string | null;
}
