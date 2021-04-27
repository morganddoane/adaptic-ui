import { ApolloError } from '@apollo/client';

export enum ApolloErrorType {
    Unauthenticated = 'UNAUTHENTICATED',
    Forbidden = 'FORBIDDEN',
    BadUserInput = 'BAD_USER_INPUT',
    VerificationError = 'VERIFICATION_ERROR',
}

export const isUnauthenticatedError = (error: ApolloError): boolean => {
    return (
        error.graphQLErrors.length > 0 &&
        (error.graphQLErrors[0].extensions as { code: ApolloErrorType })
            .code === ApolloErrorType.Unauthenticated
    );
};

export const isVerificationError = (error: ApolloError): boolean => {
    return (
        error.graphQLErrors.length > 0 &&
        (error.graphQLErrors[0].extensions as { code: ApolloErrorType })
            .code === ApolloErrorType.VerificationError
    );
};
