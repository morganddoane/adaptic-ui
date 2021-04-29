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

export const Login_Query = gql`
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

export interface LoginQuery_Res {
    login: { user: IUserAuthQuery_User };
}

export interface LoginQuery_Args {
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

export const Verify_Query = gql`
    mutation verify($method: String!, $password: String!, $code: String!) {
        verify(method: $method, password: $password, code: $code) {
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

export interface VerifyQuery_Args extends LoginQuery_Args {
    code: string;
}

export interface VerifyQuery_Res {
    verify: { user: IUserAuthQuery_User };
}

export const Resend_Query = gql`
    mutation resendVerification($method: String!, $password: String!) {
        resendVerification(method: $method, password: $password)
    }
`;

export type ResendQuery_Args = LoginQuery_Args;

export interface ResendQuery_Res {
    resendVerification: boolean;
}
