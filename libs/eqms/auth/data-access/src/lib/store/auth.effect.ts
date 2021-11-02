import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginSuccessAction,
  logoutAction,
} from '@qad-nx/eqms-auth-data-access';
import { PersistenceService } from '@qad-nx/shared-utils';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction)
        // tap(r => this.router.navigate([r.redirectUrl]))
        // mergeMap(() => this.moviesService.getAll()
        //   .pipe(
        //     map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
        //     catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
        //   )
        // )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenceService.removeToken();
          this.router.navigateByUrl('/auth');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private persistenceService: PersistenceService
  ) {}
}
