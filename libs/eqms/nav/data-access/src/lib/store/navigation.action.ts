import { createAction, props } from '@ngrx/store';
import { NavigationItem } from '@qad-nx/shared-utils';

export const loadNavigation = createAction('[Nav]/Load Navigation');

export const loadNavigationSuccess = createAction(
  '[Nav/Load Navigation Success',
  props<{
    items: any;
  }>()
);
