import { gql } from '@apollo/client';
import { IProject_Component } from './list';

export const CreateComponent_Mutation = gql`
    mutation createComponent($data: CreateComponentInput!) {
        createComponent(data: $data) {
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
        }
    }
`;

export interface ICreateComponent_Res {
    createComponent: IProject_Component;
}

export interface ICreateComponent_Args {
    data: {
        projectID: string;
        name: string;
        description?: string;
    };
}
