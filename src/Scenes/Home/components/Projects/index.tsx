import React, { ReactElement } from 'react';

import { ButtonBase, makeStyles, Typography } from '@material-ui/core';

import { IProject } from 'GraphQL/Home/Projects';
import { FolderOpenTwoTone } from '@material-ui/icons';

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

const Projects = (props: { projects: IProject[] }): ReactElement => {
    const classes = useStyles();

    const { projects } = props;

    return (
        <div className={classes.root}>
            {projects.map((project) => (
                <ButtonBase className={classes.row} key={project.id}>
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
