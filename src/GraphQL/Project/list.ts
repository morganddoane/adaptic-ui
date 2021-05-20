import { IPerson } from 'GraphQL/Home/Teams';
import { gql } from '@apollo/client';

export const ProjectQuery = gql`
    query project($id: String!) {
        project(id: $id) {
            id
            name
            dateCreated
            dateModified
            createdBy {
                id
                first
                last
                full
                email
            }
            teams {
                id
                name
            }
            components {
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
    }
`;

export interface IProject {
    id: string;
    name: string;
    dateCreated: Date;
    dateModified: Date;
    createdBy: IPerson;
    teams: {
        id: string;
        name: string;
    }[];
    components: IProject_Component[];
}

export interface IProject_Component {
    id: string;
    name: string;
    dateCreated: Date;
    dateModified: Date;
    description?: string;
    nodeCount: number;
    createdBy: IPerson;
}

export interface IProjectQuery_Res {
    project: IProject;
}

export interface IProjectQuery_Args {
    id: string;
}
