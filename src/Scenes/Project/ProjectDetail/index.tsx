import React, { ReactElement } from 'react';

import { Fade, makeStyles } from '@material-ui/core';

import { useHistory, useParams } from 'react-router';
import { IProject } from 'GraphQL/Project/list';
import ProjectNavigation from './components/Navigation';
import { usePreferencesProvider } from 'auth/providers/UserPreferenceProvider';
import ProjectAutomation from './components/Automation';
import ProjectTeams from './components/Teams';
import ProjectSettings from './components/Settings';
import ProjectComponents from './components/Components';
import { ProjectTab } from 'auth/providers/UserPreferenceProvider/Scenes/ProjectPreferences';
import { HomeTab } from 'auth/providers/UserPreferenceProvider/Scenes/HomePreferences';

const useStyles = makeStyles((theme) => ({
    root: { height: '100%', display: 'flex' },
    body: { flex: 1, height: '100%' },
}));

const ProjectDetail = (props: { project: IProject }): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const { project } = props;

    const {
        project: projectPreferences,
        setProject,
    } = usePreferencesProvider();

    const { tab } = projectPreferences;

    const [state, setState] = React.useState<{ tab: ProjectTab | null }>({
        tab: null,
    });

    React.useEffect(() => {
        if (state.tab) {
            const timeout = setTimeout(() => {
                setState((s) => ({ ...s, tab: null }));
                setProject({
                    ...projectPreferences,
                    tab: state.tab ? state.tab : ProjectTab.Components,
                });
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [state.tab, project, setProject]);

    const viewMap: Record<ProjectTab, ReactElement> = {
        [ProjectTab.Automation]: <ProjectAutomation project={project} />,
        [ProjectTab.Components]: <ProjectComponents project={project} />,
        [ProjectTab.Settings]: <ProjectSettings project={project} />,
        [ProjectTab.Teams]: <ProjectTeams project={project} />,
    };

    return (
        <div className={classes.root}>
            <ProjectNavigation
                project={project}
                tab={state.tab ? state.tab : tab}
                setTab={(tab) => setState((s) => ({ ...s, tab: tab }))}
            />

            <Fade in={!state.tab}>
                <div className={classes.body}>{viewMap[tab]}</div>
            </Fade>
        </div>
    );
};

export default ProjectDetail;
