import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient } from '@apollo/client/core/ApolloClient';
import {
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { env } from 'config';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Palette } from 'theme/Palette';
import AppDataProvider from 'auth/providers/AppDataProvider';
import ErrorBoundary from 'Components/Misc/ErrorBoundary';

const link = createHttpLink({
    uri: env.API_URL,
    credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, link]),
});

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ApolloProvider client={client}>
                    <AppDataProvider>
                        <Palette>
                            <App />
                        </Palette>
                    </AppDataProvider>
                </ApolloProvider>
            </MuiPickersUtilsProvider>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);
