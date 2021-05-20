import { IPerson, ITeam } from './Teams';
import { gql } from '@apollo/client';
import { IProject } from './Projects';

export interface IHomeSetupQuery_Res {
    projects: IProject[];
    teammates: IPerson[];
    teams: ITeam[];
}

export const HomeSetupQuery = gql`
    query homeSetup {
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
        teammates {
            id
            first
            last
            full
            email
        }
        teams {
            id
            name
            members {
                id
                first
                last
                full
                email
            }
            owner {
                id
                first
                last
                full
                email
            }
        }
    }
`;
