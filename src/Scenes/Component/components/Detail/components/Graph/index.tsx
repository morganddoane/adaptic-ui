import React, { ReactElement } from 'react';

import { Button, makeStyles, useTheme } from '@material-ui/core';
import { IComponent } from 'GraphQL/Component/Detail';
import { IPanelProps } from '../..';
import Anima, { AnimaType } from 'Components/Misc/Anima/Anima';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import GraphRender from './components/GraphRender';
import { IComponentEdits } from '../../types';
import { CreateNodeUnion } from 'GraphQL/Component/Node';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        position: 'relative',
    },
    panelControl: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const ComponentGraph = (props: {
    component: IComponent;
    panelState: IPanelProps;
    componentEdits: IComponentEdits;
    editNode: (id: string, data: CreateNodeUnion) => void;
}): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { component, panelState, componentEdits, editNode } = props;

    return (
        <div className={classes.root}>
            <GraphRender editNode={editNode} edits={componentEdits} />
            <Button
                onClick={() => panelState.toggle()}
                className={classes.panelControl}
                endIcon={
                    <Anima in={panelState.open} type={AnimaType.Spin}>
                        <ChevronLeft />
                    </Anima>
                }
            >
                Nodes
            </Button>
        </div>
    );
};

export default ComponentGraph;
