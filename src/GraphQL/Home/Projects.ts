import { gql } from '@apollo/client';

export interface IProjectPreview {
    id: string;
    name: string;
    teams: {
        id: string;
        name: string;
    }[];
    dateCreated: Date;
    dateModified: Date;
}

export const CreateProject_Mutation = gql`
    mutation creatProject($data: CreateProjectInput!) {
        createProject(data: $data) {
            id
            name
            teams {
                id
                name
            }
            dateCreated
            dateModified
        }
    }
`;

export interface ICreateProject_Res {
    createProject: IProjectPreview;
}

export interface ICreateProject_Args {
    data: {
        name: string;
        teamIDs: string[];
    };
}
