import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthApiService } from '@qad-nx/eqms-auth-data-access';
import { switchMap, tap } from 'rxjs/operators';

export interface LoginInfoStateInterface {
  isLoading: boolean;
  isError: boolean;
  loginInfo: string;
}

const defaultLoginInfoState: LoginInfoStateInterface = {
  loginInfo: '',
  isLoading: false,
  isError: false,
};

@Injectable()
export class LoginInfoStore extends ComponentStore<LoginInfoStateInterface> {
  loginInfo$ = this.select(s => s.loginInfo);
  isLoading$ = this.select(s => s.isLoading);
  isError$ = this.select(s => s.isError);

  readonly loadLoginInfo = this.effect(trigger$ =>
    trigger$.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.authApiService.getLoginInfo().pipe(
          tapResponse(
            data => {
              this.setLoginInfo(data);
            },
            error => {
              this.patchState({ isLoading: false, isError: true });
              console.error('error', error);
            }
          )
        )
      )
    )
  );

  constructor(private authApiService: AuthApiService) {
    super(defaultLoginInfoState);
    this.loadLoginInfo();
  }

  private setLoginInfo = this.updater((state, loginInfo: string) => {
    return { ...state, loginInfo };
  });
}
