import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  AuthApiService,
  CurrentUserInterface,
  loginSuccessAction,
} from '@qad-nx/eqms-auth-data-access';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

export interface AuthStateInterface {
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
  errorMessage: string;
  currentUser?: CurrentUserInterface;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthStateInterface> {
  isLoggingIn$ = this.select(s => s.isLoading);
  isError$ = this.select(s => s.isError);
  errorMessage$ = this.select(s => s.errorMessage);
  loginEffect = this.effect<{ username: string; password: string }>(params$ =>
    params$.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(({ username, password }) =>
        this.authApiService.loginUser(username, password).pipe(
          tapResponse(
            data => {
              this.patchState({ isLoading: false });
              this.store.dispatch(
                loginSuccessAction({ currentUser: data, redirectUrl: '' })
              );
              //TODO: save to local storage
            },
            (response: HttpErrorResponse) => {
              console.log(response.error.error);
              this.patchState({
                isLoading: false,
                isError: true,
                errorMessage: response.error.error,
              });
            }
          )
        )
      )
    )
  );

  constructor(
    private authApiService: AuthApiService,
    private store: Store,
    private router: Router
  ) {
    super(<AuthStateInterface>{});
  }
}
