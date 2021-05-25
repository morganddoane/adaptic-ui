import React, { ReactElement } from 'react';

import { CircularProgress, useTheme } from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { useArtemisQuery } from 'utils/hooks/artemisHooks';
import {
    ComponentQuery,
    ICompoentQuery_Args,
    ICompoentQuery_Res,
} from 'GraphQL/Component/Detail';
import { flexCenter } from 'Theme/Theme';
import Status from 'Components/Feedback/Status';
import AppNav from 'Components/Navigation/AppNav';

const Component = (): ReactElement => {
    const theme = useTheme();

    const { id = '' } = useParams<{ id?: string }>();

    const { data, error, loading } = useArtemisQuery<
        ICompoentQuery_Res,
        ICompoentQuery_Args
    >(ComponentQuery, {
        variables: {
            id: id,
        },
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
                    <Status
                        status="Error"
                        message={'Failed to get component.'}
                    />
                </div>
            );
        if (data) return <div />;
        else
            return (
                <div style={{ ...flexCenter, height: '100%' }}>
                    <Status
                        status="Error"
                        message={'Failed to find component.'}
                    />
                </div>
            );
    };

    return <AppNav>{getView()}</AppNav>;
};

export default Component;
