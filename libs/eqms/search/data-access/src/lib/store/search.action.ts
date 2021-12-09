import { createAction, props } from '@ngrx/store';
import { SearchResult } from '@qad-nx/eqms/search/data-access';

export const loadSearch = createAction(
  '[Search]Load Search Page',
  props<{ systemName: string }>()
);

export const loadSearchSuccess = createAction(
  '[Nav]Load Search Success',
  props<{
    searchResult: SearchResult;
  }>()
);
