import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Book, Group } from '@material-ui/icons';

export interface IHomePreferences {
    tab: HomeTab;
}

export interface IHomeAction {
    type: 'Home';
    payload: {
        tab: HomeTab;
    };
}

export enum HomeTab {
    Projects = 'Projects',
    Teams = 'Teams',
}

export const HomeIcons: Record<
    HomeTab,
    OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
> = {
    [HomeTab.Projects]: Book,
    [HomeTab.Teams]: Group,
};
