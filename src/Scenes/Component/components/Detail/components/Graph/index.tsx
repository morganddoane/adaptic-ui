import React, { ReactElement } from 'react';

import { Button, makeStyles, useTheme } from '@material-ui/core';
import { IComponent } from 'GraphQL/Component/Detail';
import { IPanelProps } from '../..';
import Anima, { AnimaType } from 'Components/Misc/Anima/Anima';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

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
}): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { component, panelState } = props;

    return (
        <div className={classes.root}>
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
