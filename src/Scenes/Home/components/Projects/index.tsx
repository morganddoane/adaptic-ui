import React, { ReactElement } from 'react';

import { ButtonBase, makeStyles, Typography } from '@material-ui/core';

import { IProjectPreview } from 'GraphQL/Home/Projects';
import { FolderOpenTwoTone } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
    },
    row: {
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        color: theme.palette.text.primary,
    },
    body: {
        flex: 1,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-start',
        paddingLeft: theme.spacing(2),
    },
}));

const Projects = (props: { projects: IProjectPreview[] }): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const { projects } = props;

    return (
        <div className={classes.root}>
            {projects.map((project) => (
                <ButtonBase
                    onClick={() => history.push(`/projects/${project.id}`)}
                    className={classes.row}
                    key={project.id}
                >
                    <FolderOpenTwoTone />
                    <div className={classes.body}>
                        <Typography variant="h6" color="textPrimary">
                            {project.name}
                        </Typography>
                    </div>
                </ButtonBase>
            ))}
        </div>
    );
};

export default Projects;
