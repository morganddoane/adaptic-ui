import { gql } from '@apollo/client';

export interface IProject {
    id: string;
    name: string;
    teams: {
        id: string;
        name: string;
    }[];
    dateCreated: Date;
    dateModified: Date;
}

export interface IProjectsQuery_Res {
    projects: IProject[];
}

export const ProjectsQuery = gql`
    query projects {
        projects {
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
