import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from './auth.store';

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth');

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
);
