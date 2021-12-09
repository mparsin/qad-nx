import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '@qad-nx/eqms-feature-shell';
import {
  isLoadedSelector,
  loadedSearchResultSelector,
  loadSearch,
} from '@qad-nx/eqms/search/data-access';
import { SearchApiService } from 'libs/eqms/search/data-access/src/lib/http/search-api.service';
import { first, tap } from 'rxjs';

@Injectable()
export class SearchResolver implements Resolve<any> {
  constructor(
    private store: Store<AppState>,
    private searchApiService: SearchApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.pipe(
      select(loadedSearchResultSelector),
      tap(searchLoaded => {
        console.log('searchLoaded', searchLoaded);
        if (
          !searchLoaded.loaded ||
          searchLoaded.searchResult?.systemName !== route.params.systemName
        ) {
          this.store.dispatch(
            loadSearch({ systemName: route.params.systemName })
          );
        }
      }),
      first()
    );
    //return this.searchApiService.loadProcessRecords(route.params.systemName);
  }
}
