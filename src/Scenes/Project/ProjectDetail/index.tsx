import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

import { useHistory, useParams } from 'react-router';
import { IProject } from 'GraphQL/Project/list';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const ProjectDetail = (props: { project: IProject }): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const { project } = props;

    return <div className={classes.root}></div>;
};

export default ProjectDetail;
