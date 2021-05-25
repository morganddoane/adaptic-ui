import AppNav from 'Components/Navigation/AppNav';
import React, { ReactElement } from 'react';

import {
    CircularProgress,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Status from 'Components/Feedback/Status';
import {
    IProjectQuery_Res,
    IProjectQuery_Args,
    ProjectQuery,
} from 'GraphQL/Project/list';
import { useParams } from 'react-router-dom';
import { flexCenter } from 'Theme/Theme';
import { useArtemisQuery } from 'utils/hooks/artemisHooks';

const Component = (): ReactElement => {
    const theme = useTheme();

    const { id = '' } = useParams<{ id?: string }>();

    const { data, error, loading } = useArtemisQuery<
        IProjectQuery_Res,
        IProjectQuery_Args
    >(ProjectQuery, {
        variables: {
            id: id,
        },
        fetchPolicy: 'network-only',
    });

    const getView = () => {
        if (loading)
            return (
                <div style={{ ...flexCenter, height: '100%' }}>
                    <CircularProgress />
                </div>
            );
        if (error)
            return (
                <div style={{ ...flexCenter, height: '100%' }}>
                    <Status status="Error" message={'Failed to get project.'} />
                </div>
            );
        if (data) return <div />;
        else
            return (
                <div style={{ ...flexCenter, height: '100%' }}>
                    <Status
                        status="Error"
                        message={'Failed to find project.'}
                    />
                </div>
            );
    };

    return <AppNav>{getView()}</AppNav>;
};

export default Component;
