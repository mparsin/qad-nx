import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '@qad-nx/eqms-feature-shell';
import { loadNavigation } from '@qad-nx/eqms/nav/data-access';
import { isLoadedSelector } from 'libs/eqms/nav/data-access/src/lib/store/navigation.selector';
import { filter, first, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationResolver implements Resolve<any> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.pipe(
      select(isLoadedSelector),
      tap(navigationLoaded => {
        if (!navigationLoaded) {
          this.store.dispatch(loadNavigation());
        }
      }),
      first()
    );
  }
}
