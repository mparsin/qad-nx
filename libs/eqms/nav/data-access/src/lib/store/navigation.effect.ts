import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NavigationService } from '@qad-nx/shared-utils';
import { NavigationApiService } from 'libs/eqms/nav/data-access/src/lib/http/navigation-api.service';
import {
  loadNavigation,
  loadNavigationSuccess,
} from 'libs/eqms/nav/data-access/src/lib/store/navigation.action';
import { EMPTY, exhaustMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NavigationEffect {
  loadNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNavigation),
      exhaustMap(() =>
        this.navApi.loadNavigationProcesses().pipe(
          map(response =>
            loadNavigationSuccess({
              items: response,
            })
          ),
          catchError(() => EMPTY)
        )
      ),
      ofType(loadNavigationSuccess),
      tap(response => {
        console.log('items', response);
        this.navigationService.setItems(response.items);
      })
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private navApi: NavigationApiService,
    private navigationService: NavigationService
  ) {}
}
