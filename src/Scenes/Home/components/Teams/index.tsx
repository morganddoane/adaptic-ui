import React, { ReactElement } from 'react';

import {
    Avatar,
    Button,
    ButtonBase,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { ITeam } from 'GraphQL/Home/Teams';
import { MdAdd } from 'react-icons/md';
import { AvatarGroup } from '@material-ui/lab';
import Br from 'Components/Layout/Br';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
    },
    row: {
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-start',
    },
}));

const Teams = (props: { teams: ITeam[] }): ReactElement => {
    const classes = useStyles();

    const { teams } = props;

    return (
        <div className={classes.root}>
            {teams.map((team) => (
                <ButtonBase className={classes.row} key={team.id}>
                    <Typography variant="h6" color="textPrimary">
                        {team.name}
                    </Typography>
                    <Typography color="textSecondary">
                        {team.members.length + 1} member
                        {team.members.length == 0 ? '' : 's'}
                    </Typography>
                    <Br space={1} />
                    <AvatarGroup max={4}>
                        {[team.owner, ...team.members].map((member) => (
                            <Avatar key={member.id + team.id}>
                                {member.first[0] + member.last[0]}
                            </Avatar>
                        ))}
                    </AvatarGroup>
                </ButtonBase>
            ))}
        </div>
    );
};

export default Teams;
