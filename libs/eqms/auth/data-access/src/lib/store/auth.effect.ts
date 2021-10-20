import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginSuccessAction } from '@qad-nx/eqms-auth-data-access';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(r => console.log("Login success", r)),
      tap(r => this.router.navigate([r.redirectUrl]))
      // mergeMap(() => this.moviesService.getAll()
      //   .pipe(
      //     map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
      //     catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
      //   )
      // )
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions, private router: Router
  ) {}
}
