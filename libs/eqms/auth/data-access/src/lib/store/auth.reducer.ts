import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface, loginSuccessAction } from '@qad-nx/eqms-auth-data-access';

const initialState: AuthStateInterface = {
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  errorMessage: ''
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
      //TODO: currentUser: action.currentUser,
      isError: false,
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
