import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useNodeStyles } from '../styles';
import { RenderNodeData, RenderNodeProps } from '../types';

const ComponentNode = (props: RenderNodeProps): ReactElement => {
    const classes = useNodeStyles();

    const { data } = props;
    const { node } = data;

    const { id, label } = node;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6" color="textPrimary">
                    Component
                </Typography>
            </div>
            <div className={classes.body}>
                <div className={clsx(classes.bodySection, classes.left)}></div>
                <div className={clsx(classes.bodySection, classes.right)}></div>
            </div>
        </div>
    );
};

export default ComponentNode;
