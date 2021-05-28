import React, { ReactElement } from 'react';
import { Fade, FormControlLabel, Switch, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { useNodeStyles } from '../styles';
import { getInputHandleID, RenderNodeProps } from '../types';
import { Handle, Position } from 'react-flow-renderer';
import { ICreateSumNode } from 'GraphQL/Component/Node';

const SumNode = (props: RenderNodeProps): ReactElement => {
    const classes = useNodeStyles();

    const { data } = props;
    const { node, update } = data;

    const { id, label } = node;

    if (node.__typename !== 'SumNode') return <div />;

    const handleEdit = (data: Partial<ICreateSumNode>) => {
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
                        helperText="(Sum)"
                    />
                </div>
            </div>
            <div className={classes.body}>
                <Fade in={node.abstract}>
                    <div className={clsx(classes.bodySection, classes.left)}>
                        <Handle
                            id={getInputHandleID(node.id, 'inputs')}
                            position={Position.Left}
                            type={'target'}
                        />
                    </div>
                </Fade>

                <div className={clsx(classes.bodySection, classes.right)}>
                    <Handle
                        id={node.id}
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

export default SumNode;
