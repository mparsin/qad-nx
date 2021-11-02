import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  navFeatureKey,
  NavigationStateInterface,
} from '@qad-nx/eqms/nav/data-access';
import {
  NavigationDropdown,
  NavigationItem,
  NavigationLink,
} from '@qad-nx/shared-utils';

export const navFeatureSelector =
  createFeatureSelector<NavigationStateInterface>(navFeatureKey);

export const favoriteSelector = createSelector(
  navFeatureSelector,
  (navState: NavigationStateInterface) => filterFavorites(navState?.entities)
);

export const filterSelector = createSelector(
  navFeatureSelector,
  (navState: NavigationStateInterface) => {
    return navState.filter;
  }
);

export const itemsSelector = createSelector(
  navFeatureSelector,
  (navState: NavigationStateInterface) => {
    const result = <NavigationDropdown[]>Object.values(navState.entities);
    if (navState.filter) {
      const filteredGroups: NavigationDropdown[] = [];
      for (let ng of result) {
        const filteredItems = ng.children.filter(
          ni =>
            ni.label.toUpperCase().indexOf(navState.filter.toUpperCase()) >=
              0 ||
            (ni.type == 'link' &&
              !!ni.documentation &&
              ni.documentation.indexOf(navState.filter) >= 0)
        );
        if (filteredItems.length > 0) {
          filteredGroups.push({ ...ng, children: filteredItems });
        }
      }
      return filteredGroups;
    }
    return result;
  }
);

export const isLoadingSelector = createSelector(
  navFeatureSelector,
  (navState: NavigationStateInterface) => navState.loading
);

export const isLoadedSelector = createSelector(
  navFeatureSelector,
  (navState: NavigationStateInterface) => navState.loaded
);

function filterFavorites(
  dictionary: Dictionary<NavigationLink | NavigationDropdown>
) {
  if (!dictionary) return [];
  const keys = Object.keys(dictionary);
  const result: NavigationLink[] = [];
  for (const key of keys) {
    const gr = dictionary[key];
    if (!gr) {
      continue;
    }
    if (gr.type === 'dropdown') {
      for (const item of gr.children) {
        if (item.type === 'link' && item.isFavorite) {
          if (!result.find(r => r.label === item.label)) {
            result.push(item);
          }
        }
      }
    }
  }
  return result.sort(compare);

  function compare(a: NavigationItem, b: NavigationItem) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  }
}
