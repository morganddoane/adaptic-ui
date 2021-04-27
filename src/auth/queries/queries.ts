import { gql } from '@apollo/client';

export interface IUserAuthQuery_User {
    id: string;
    first: string;
    last: string;
    username: string;
    full: string;
    email: string;
    roles: string;
    status: string;
}

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
}

export const QLoggedInUser_Query = gql`
    query {
        loggedInUser {
            user {
                id
                first
                last
                username
                full
                email
                roles
                status
            }
        }
    }
`;

export interface ILoggedInUser_Response {
    loggedInUser: { user: IUserAuthQuery_User };
}

export const QLogin_Query = gql`
    mutation($method: String!, $password: String!) {
        login(method: $method, password: $password) {
            user {
                id
                first
                last
                username
                full
                email
                roles
                status
            }
        }
    }
`;

export interface ILogin_Response {
    login: { user: IUserAuthQuery_User };
}

export interface ILogin_Input {
    method: string;
    password: string;
}

export const QLogout_Query = gql`
    mutation logout {
        logout {
            logoutTime
        }
    }
`;

export interface ILogout_Response {
    logout: { logoutTime: Date };
}
