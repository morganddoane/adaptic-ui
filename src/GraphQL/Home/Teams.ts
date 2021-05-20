import { gql } from '@apollo/client';

export interface ITeam {
    id: string;
    name: string;
    members: IPerson[];
    owner: IPerson;
}

export interface IPerson {
    id: string;
    first: string;
    last: string;
    full: string;
    email: string;
}

export interface ITeamsQuery_Res {
    teams: ITeam[];
}

export const TeamsQuery = gql`
    query teams {
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
