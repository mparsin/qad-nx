import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { AuthApiService } from 'libs/web/auth/data-access/src/lib/http/auth-api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginSuccessAction } from 'libs/web/auth/data-access/src/lib/store/auth.action';

export interface AuthStateInterface {
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthStateInterface> {
  isLoggingIn$ = this.select(s => s.isLoading);
  isError$ = this.select(s => s.isError);
  loginEffect = this.effect<{ username: string, password: string }>((params$) =>
    params$.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(({ username, password }) =>
        this.authApiService.loginUser(username, password).pipe(
          tapResponse((data) => {
            console.log(data);
            this.patchState({ isLoading: false });
            console.log('updating global state')
            this.store.dispatch(loginSuccessAction({ currentUser: data, redirectUrl: '' }));//TODO: update global state
            //TODO: save to local storage
          }, (error) => {
            console.log(error);
            this.patchState({ isLoading: false, isError: true });
          }))
      )
    ));

  constructor(private authApiService: AuthApiService, private store: Store) {
    super(<AuthStateInterface>{});
  }
}
