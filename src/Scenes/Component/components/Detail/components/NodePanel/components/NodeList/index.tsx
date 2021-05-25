import React, { ReactElement } from 'react';

import {
    Collapse,
    List,
    ListItem,
    ListItemSecondaryAction,
    makeStyles,
    useTheme,
} from '@material-ui/core';
import { IComponent, NodeClass } from 'GraphQL/Component/Detail';
import Anima, { AnimaType } from 'Components/Misc/Anima/Anima';
import { ExpandMore } from '@material-ui/icons';
import { useArtemisQuery } from 'utils/hooks/artemisHooks';
import {
    ComponentList_Query,
    IComponentList_Args,
    IComponentList_Res,
} from 'GraphQL/Component/Components';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
    },
    node: {
        margin: theme.spacing(1),
        borderRadius: theme.radius(2),
        border: `2px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(1),
    },
}));

export enum NodeCategory {
    Logic = 'Logic',
    Math = 'Math',
    Other = 'Other',
}

const nodeAssignments: Record<NodeClass, NodeCategory> = {
    [NodeClass.Boolean]: NodeCategory.Logic,
    [NodeClass.Component]: NodeCategory.Other,
    [NodeClass.Delta]: NodeCategory.Math,
    [NodeClass.Logic]: NodeCategory.Logic,
    [NodeClass.Number]: NodeCategory.Math,
    [NodeClass.Product]: NodeCategory.Math,
    [NodeClass.String]: NodeCategory.Other,
    [NodeClass.Sum]: NodeCategory.Math,
};

const NodeList = (props: { component: IComponent }): ReactElement => {
    const theme = useTheme();
    const classes = useStyles();

    const { component } = props;

    const { data, error, loading } = useArtemisQuery<
        IComponentList_Res,
        IComponentList_Args
    >(ComponentList_Query, {
        variables: {
            projectID: component.project.id,
        },
    });

    const components = data ? data.components : [];

    const filtered = components.filter((c) => c.id !== component.id);

    const [state, setState] = React.useState<{
        expanded: (NodeCategory | 'Component')[];
    }>({
        expanded: [],
    });

    const displayNodes = [
        NodeClass.Boolean,
        NodeClass.Delta,
        NodeClass.Logic,
        NodeClass.Number,
        NodeClass.Product,
        NodeClass.String,
        NodeClass.Sum,
    ];

    const toggleCategory = (category: NodeCategory | 'Component') => {
        if (state.expanded.includes(category))
            setState((s) => ({
                ...s,
                expanded: s.expanded.filter((cat) => cat !== category),
            }));
        else
            setState((s) => ({
                ...s,
                expanded: [...s.expanded, category],
            }));
    };

    return (
        <div className={classes.root}>
            <List>
                {Object.keys(NodeCategory).map((key) => (
                    <React.Fragment key={key}>
                        <ListItem
                            onClick={() => toggleCategory(key as NodeCategory)}
                            button
                            divider
                        >
                            {key}
                            <ListItemSecondaryAction>
                                <Anima
                                    in={state.expanded.includes(
                                        key as NodeCategory
                                    )}
                                    type={AnimaType.Spin}
                                >
                                    <ExpandMore />
                                </Anima>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Collapse
                            in={state.expanded.includes(key as NodeCategory)}
                        >
                            {displayNodes
                                .filter(
                                    (node) =>
                                        nodeAssignments[node] ==
                                        (key as NodeCategory)
                                )
                                .map((node) => (
                                    <div
                                        key={'n' + node}
                                        className={classes.node}
                                    >
                                        {node}
                                    </div>
                                ))}
                        </Collapse>
                    </React.Fragment>
                ))}

                <ListItem
                    onClick={() => toggleCategory('Component')}
                    button
                    divider
                >
                    Components
                    <ListItemSecondaryAction>
                        <Anima
                            in={state.expanded.includes('Component')}
                            type={AnimaType.Spin}
                        >
                            <ExpandMore />
                        </Anima>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={state.expanded.includes('Component')}>
                    {filtered.map((component) => (
                        <div key={'n' + component.id} className={classes.node}>
                            {component.name}
                        </div>
                    ))}
                </Collapse>
            </List>
        </div>
    );
};

export default NodeList;
