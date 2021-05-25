import React, { ReactElement } from 'react';
import { Fade, FormControlLabel, Switch, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { useNodeStyles } from '../styles';
import { getHandleId, RenderNodeProps } from '../types';
import { Handle, Position } from 'react-flow-renderer';
import { ICreateNumberNode } from 'GraphQL/Component/Node';

const NumberNode = (props: RenderNodeProps): ReactElement => {
    const classes = useNodeStyles();

    const { data } = props;
    const { node, update } = data;

    const { id, label } = node;

    if (node.__typename !== 'NumberNode') return <div />;

    const handleEdit = (data: Partial<ICreateNumberNode>) => {
        update(id, { ...node, ...data });
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div>
                    <TextField
                        onChange={(e) => {
                            handleEdit({
                                label: e.target.value ? e.target.value : null,
                            });
                        }}
                        value={label ? label : ''}
                        placeholder="Label"
                        helperText="(Number)"
                    />
                </div>
            </div>
            <div className={classes.body}>
                <Fade in={node.abstract}>
                    <div className={clsx(classes.bodySection, classes.left)}>
                        <Handle
                            id={getHandleId(node.id, 'In')}
                            position={Position.Left}
                            type={'target'}
                        />
                    </div>
                </Fade>

                <div className={clsx(classes.bodySection, classes.right)}>
                    <Handle
                        id={getHandleId(node.id, 'Out')}
                        position={Position.Right}
                        type={'source'}
                    />
                </div>
            </div>
            <div className={classes.value}>
                {node.value ? node.value : 'undefined'}
            </div>
            <div className={classes.footer}>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            onClick={() =>
                                handleEdit({ abstract: !node.abstract })
                            }
                            checked={!node.abstract}
                        />
                    }
                    label="Input"
                />
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            onClick={() => handleEdit({ output: !node.output })}
                            checked={node.output}
                        />
                    }
                    label="Export"
                />
            </div>
        </div>
    );
};

export default NumberNode;
