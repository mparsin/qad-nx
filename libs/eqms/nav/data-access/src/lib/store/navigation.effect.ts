import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { NavigationDropdown } from '@qad-nx/shared-utils';
import { NavigationApiService } from 'libs/eqms/nav/data-access/src/lib/http/navigation-api.service';
import {
  loadNavigation,
  loadNavigationSuccess,
} from 'libs/eqms/nav/data-access/src/lib/store/navigation.action';
import { EMPTY, exhaustMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface NavigationStateInterface
  extends EntityState<NavigationDropdown> {
  loading: boolean;
  loaded: boolean;
  filter: string;
}

export const adapter: EntityAdapter<NavigationDropdown> =
  createEntityAdapter<NavigationDropdown>();
export const initialNavigationState = adapter.getInitialState({
  loading: false,
  loaded: false,
  filter: '',
});

@Injectable()
export class NavigationEffect {
  loadNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNavigation),
      exhaustMap(params =>
        this.navApi.loadNavigationProcesses().pipe(
          map(response =>
            loadNavigationSuccess({
              items: response,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('errorResponse', errorResponse);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private navApi: NavigationApiService
  ) {}
}
