import React, { ReactElement } from 'react';

import { Button, makeStyles, Typography } from '@material-ui/core';

import { useHistory } from 'react-router';
import { IProject } from 'GraphQL/Project/list';
import {
    ProjectIcons,
    ProjectTab,
} from 'auth/providers/UserPreferenceProvider/Scenes/ProjectPreferences';
import { AppTab, AppTabs } from 'Components/Navigation/AppTabs';
import Br from 'Components/Layout/Br';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 240,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        height: '100%',
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
}));

const ProjectNavigation = (props: {
    project: IProject;
    tab: ProjectTab;
    setTab: (tab: ProjectTab) => void;
}): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const { project, tab, setTab } = props;

    return (
        <div className={classes.root}>
            <Button onClick={() => history.push('/home')}>Projects</Button>
            <Typography variant="h4">{project.name}</Typography>
            <Br />
            <AppTabs
                value={Object.values(ProjectTab).indexOf(tab)}
                orientation="vertical"
            >
                {Object.values(ProjectTab).map((tab) => {
                    const Icon = ProjectIcons[tab as ProjectTab];
                    return (
                        <AppTab
                            icon={<Icon />}
                            orientation="vertical"
                            onClick={() => setTab(tab as ProjectTab)}
                            key={'tab_' + tab}
                            label={tab}
                        />
                    );
                })}
            </AppTabs>
        </div>
    );
};

export default ProjectNavigation;
