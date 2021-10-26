import { Action, createReducer, on } from '@ngrx/store';
import {
  AuthStateInterface,
  loginSuccessAction,
  logoutAction,
} from '@qad-nx/eqms-auth-data-access';

const initialState: AuthStateInterface = {
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  errorMessage: '',
  currentUser: undefined,
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialState,
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
      isError: false,
    })
  ),
  on(
    logoutAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: undefined,
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
