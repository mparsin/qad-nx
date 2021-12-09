import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchStateInterface } from '@qad-nx/eqms/search/data-access';

export const searchFeatureKey = 'search';

export const searchFeatureSelector =
  createFeatureSelector<SearchStateInterface>(searchFeatureKey);

export const isLoadingSelector = createSelector(
  searchFeatureSelector,
  (searchState: SearchStateInterface) => searchState.loading
);

export const isLoadedSelector = createSelector(
  searchFeatureSelector,
  (searchState: SearchStateInterface) => searchState.loaded
);

export const searchResultSelector = createSelector(
  searchFeatureSelector,
  (searchState: SearchStateInterface) => searchState.searchResult
);

export const loadedSearchResultSelector = createSelector(
  searchFeatureSelector,
  (searchState: SearchStateInterface) => {
    return {
      loaded: searchState.loaded,
      searchResult: searchState.searchResult,
    };
  }
);

export const columnsSelector = createSelector(
  searchFeatureSelector,
  (searchState: SearchStateInterface) =>
    searchState.searchResult?.appliedLayout?.columns
);

export const rowsSelector = createSelector(
  searchFeatureSelector,
  (searchState: SearchStateInterface) => searchState.searchResult?.items
);
