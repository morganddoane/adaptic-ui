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

export const CreateTeam_Mutation = gql`
    mutation createTeam($data: CreateTeamInput!) {
        createTeam(data: $data) {
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

export interface ICreateTeam_Args {
    data: {
        name: string;
        emails: string[];
    };
}

export interface ICreateTeam_Res {
    createTeam: ITeam;
}
