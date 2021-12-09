import { Action, createReducer, on } from '@ngrx/store';
import {
  loadSearch,
  loadSearchSuccess,
  SearchStateInterface,
} from '@qad-nx/eqms/search/data-access';

const initialSearchState: SearchStateInterface = {
  loading: false,
  loaded: false,
  searchResult: undefined,
};

export const searchReducer = createReducer(
  initialSearchState,
  on(loadSearch, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(loadSearchSuccess, (state, { searchResult }): SearchStateInterface => {
    console.log(searchResult);
    return {
      ...state,
      searchResult: searchResult,
      loaded: true,
      loading: false,
    };
  })
);

export function reducers(state: SearchStateInterface, action: Action) {
  return searchReducer(state, action);
}
