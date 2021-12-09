import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSearch, loadSearchSuccess } from '@qad-nx/eqms/search/data-access';
import { SearchApiService } from 'libs/eqms/search/data-access/src/lib/http/search-api.service';
import { exhaustMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchEffect {
  loadSearch$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadSearch),
        exhaustMap(params =>
          this.searchApi.loadProcessRecords(params.systemName).pipe(
            tap(r => console.log('loadSearch effect', r)),
            // map(response => response.appliedLayout.columns),
            map(response =>
              loadSearchSuccess({
                searchResult: response,
              })
            )
          )
        )
      ),
    { dispatch: true }
  );

  constructor(private actions$: Actions, private searchApi: SearchApiService) {}
}
