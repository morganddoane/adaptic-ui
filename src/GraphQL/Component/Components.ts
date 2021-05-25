import { gql } from '@apollo/client';
import { IPerson } from 'GraphQL/Home/Teams';

export const ComponentList_Query = gql`
    query components($projectID: String!) {
        components(projectID: $projectID) {
            id
            name
            description
            dateCreated
            dateModified
            createdBy {
                id
                first
                last
                full
                email
            }
            nodeCount
        }
    }
`;

export interface IComponentList_Res {
    components: {
        id: string;
        name: string;
        description: string | null;
        dateCreated: string;
        dateModified: string;
        createdBy: IPerson;
        nodeCount: number;
    }[];
}

export interface IComponentList_Args {
    projectID: string;
}
