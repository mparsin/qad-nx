import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '@qad-nx/web/auth/data-access';
import { loginSuccessAction } from 'libs/web/auth/data-access/src/lib/store/auth.action';

const initialState: AuthStateInterface = {
  isLoading: false,
  isLoggedIn: false,
  isError: false
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
      isError: false
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
