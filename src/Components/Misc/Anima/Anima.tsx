import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

export enum AnimaType {
    GrowLeft = 'GrowLeft',
}

const useStyles = (type: AnimaType) =>
    makeStyles((theme) => {
        switch (type) {
            case AnimaType.GrowLeft: {
                return {
                    root: {
                        paddingLeft: theme.spacing(2),
                        opacity: 0,
                        transition: theme.transitions.create('all', {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                    in: {
                        paddingLeft: 0,
                        opacity: 1,
                    },
                };
            }
        }
    })();

const Anima = (props: {
    type: AnimaType;
    children: ReactElement;
    in: boolean;
}): ReactElement => {
    const classes = useStyles(props.type);
    return (
        <div className={clsx(classes.root, { [classes.in]: props.in })}>
            {props.children}
        </div>
    );
};

export default Anima;
