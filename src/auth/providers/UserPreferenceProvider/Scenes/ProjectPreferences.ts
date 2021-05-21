import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import {
    AccountTreeRounded,
    Group,
    OfflineBolt,
    Settings,
} from '@material-ui/icons';

export interface IProjectPreferences {
    tab: ProjectTab;
    componentSortBy: ComponentSortBy;
    component?: string;
}

export enum ComponentSortBy {
    DateCreated = 'Date Created',
    DateModified = 'Last Modified',
    Name = 'Name',
}

export interface IProjectAction {
    type: 'Project';
    payload: {
        tab: ProjectTab;
        componentSortBy: ComponentSortBy;
    };
}

export enum ProjectTab {
    Components = 'Components',
    Automation = 'Automation',
    Settings = 'Settings',
    Teams = 'Teams',
}

export const ProjectIcons: Record<
    ProjectTab,
    OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
> = {
    [ProjectTab.Automation]: OfflineBolt,
    [ProjectTab.Components]: AccountTreeRounded,
    [ProjectTab.Settings]: Settings,
    [ProjectTab.Teams]: Group,
};
