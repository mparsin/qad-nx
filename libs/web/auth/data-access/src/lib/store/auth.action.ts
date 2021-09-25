import { createAction, props } from '@ngrx/store';
import { CurrentUserInterface } from '@qad-nx/web/auth/data-access';
import { ActionTypes } from './actionTypes';

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface; redirectUrl: string }>()
);
