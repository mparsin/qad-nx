import { createAction, props } from '@ngrx/store';
import { NavigationDropdown } from '@qad-nx/shared-utils';

export const loadNavigation = createAction('[Nav]Load Navigation');

export const loadNavigationSuccess = createAction(
  '[Nav]Load Navigation Success',
  props<{
    items: Array<NavigationDropdown>;
  }>()
);

export const favoriteChanged = createAction(
  '[Nav] Favorite changed',
  props<{
    id: number;
    value: boolean;
  }>()
);

export const filterNavigation = createAction(
  '[Nav] Filter navigation',
  props<{ filter: string }>()
);

export const filterNavigationSuccess = createAction(
  '[Nav]Filter Navigation Success',
  props<{
    items: Array<NavigationDropdown>;
  }>()
);
