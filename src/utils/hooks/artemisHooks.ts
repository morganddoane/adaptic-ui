import {
    ApolloError,
    FetchResult,
    MutationResult,
    MutationTuple,
    NetworkStatus,
    OperationVariables,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import {
    LazyQueryHookOptions,
    LazyQueryResult,
    MutationHookOptions,
    QueryHookOptions,
    QueryLazyOptions,
    QueryResult,
    QueryTuple,
} from '@apollo/client/react/types/types';
import { DocumentNode } from 'graphql';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isUnauthenticatedError } from 'utils/errors';

/**
 * Apollo useMutation wrapper
 * - Enables reset state on mutation.
 * - Refreshes page on auth failure
 * - Error policy is forced to all
 * - Fetch policy defaults to no-cache
 * @param query
 * @param options
 */
export function useArtemisMutation<TData = any, TVariables = any>(
    query: DocumentNode,
    options: MutationHookOptions<TData, TVariables> = {}
): [
    MutationTuple<TData, TVariables>[0],
    MutationResult<TData> & { reset: () => void }
] {
    const [{ data, state }, setState] = useState<{
        data: Pick<
            MutationResult<TData>,
            'data' | 'called' | 'loading' | 'error'
        >;
        state: 'called' | 'fetching' | 'empty';
    }>({
        data: {
            called: false,
            loading: false,
        },
        state: 'empty',
    });

    const [mutate, { client, ...response }] = useMutation<TData, TVariables>(
        query,
        {
            ...options,
            errorPolicy: 'all',
            onCompleted: undefined,
            onError: undefined,
        }
    );

    const mutateWrapper = async (
        opts: Parameters<MutationTuple<TData, TVariables>[0]>[0]
    ): Promise<FetchResult<TData>> => {
        return mutate(opts);
    };

    const reset = () => {
        setState({
            data: {
                data: undefined,
                loading: false,
                called: false,
                error: undefined,
            },
            state: 'empty',
        });
    };

    if (data.error && isUnauthenticatedError(data.error)) {
        history.go(0);
    } else if ((state === 'empty' || state === 'called') && response.loading) {
        setState({
            data: { ...response },
            state: 'fetching',
        });
    } else if (state === 'fetching' && (response.data || response.error)) {
        setState({
            data: { ...response },
            state: 'called',
        });
    }

    return [mutateWrapper, { ...data, client, reset }];
}

/**
 * Apollo useQuery wrapper
 * - Refreshes page on auth failure
 * - Error policy is forced to all
 * - Fetch policy defaults to no-cache
 * @param query
 * @param options
 */
export function useArtemisQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
    const history = useHistory();

    const result = useQuery<TData, TVariables>(query, {
        ...options,
        errorPolicy: 'all',
    });

    if (result.error && isUnauthenticatedError(result.error)) history.go(0);

    return result;
}

/**
 * Apollo useLazyQuery wrapper
 * - Refreshes page on auth failure
 * - Error policy is forced to all
 * - Enables reset state
 * @param query
 * @param options
 */
export function useArtemisLazyQuery<
    TData = any,
    TVariables = OperationVariables
>(
    query: DocumentNode,
    options: LazyQueryHookOptions<TData, TVariables> = {}
): [
    QueryTuple<TData, TVariables>[0],
    LazyQueryResult<TData, TVariables> & { reset: () => void }
] {
    const [{ data, state }, setState] = useState<{
        data: LazyQueryResult<TData, TVariables>;
        state: 'called' | 'fetching' | 'empty';
    }>({
        data: {
            called: false,
            loading: false,
            data: undefined,
            networkStatus: NetworkStatus.ready,
        },
        state: 'empty',
    });

    const [fetchData, { ...response }] = useLazyQuery<TData, TVariables>(
        query,
        {
            ...options,
            errorPolicy: 'all',
            onCompleted: undefined,
            onError: undefined,
        }
    );

    const reset = () => {
        setState({
            data: {
                data: undefined,
                loading: false,
                called: false,
                error: undefined,
                networkStatus: NetworkStatus.ready,
            },
            state: 'empty',
        });
    };

    if (data.error && isUnauthenticatedError(data.error)) {
        history.go(0);
    } else if ((state === 'empty' || state === 'called') && response.loading) {
        setState({
            data: { ...response },
            state: 'fetching',
        });
    } else if (state === 'fetching' && (response.data || response.error)) {
        setState({
            data: { ...response },
            state: 'called',
        });
    }

    return [fetchData, { ...data, reset }];
}

export const combineQueryStatuses = (
    ...args: (
        | MutationResult<any>
        | QueryResult<any, any>
        | LazyQueryResult<any, any>
    )[]
):
    | { status: 'error'; error: ApolloError }
    | { status: 'loading' }
    | { status: 'complete' } => {
    let loading = false;
    let error: ApolloError | undefined = undefined;
    for (const data of args) {
        if (data.loading) loading = true;
        else if (data.error) error = data.error;
    }

    if (error) return { status: 'error', error: error };
    else if (loading) return { status: 'loading' };
    else return { status: 'complete' };
};
