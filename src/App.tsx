import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppRouter } from 'auth/router/AppRouter';
import Loading from 'Components/Misc/Loading';
import { useAppDataProvider } from 'auth/providers/AppDataProvider';

const App = (): ReactElement => {
    const { user, loading, error } = useAppDataProvider();

    if (loading) return <Loading />;
    if (error) return <div>An error occurred...</div>;

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
