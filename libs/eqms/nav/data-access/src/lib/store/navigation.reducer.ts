import { Action, createReducer, on } from '@ngrx/store';
import {
  adapter,
  favoriteChanged,
  filterNavigation,
  initialNavigationState,
  loadNavigation,
  loadNavigationSuccess,
  NavigationStateInterface,
} from '@qad-nx/eqms/nav/data-access';
import { NavigationDropdown, NavigationLink } from '@qad-nx/shared-utils';
import copy from 'fast-copy';

export const navFeatureKey = 'nav';

function getItems(
  items: NavigationStateInterface,
  id: number
): NavigationDropdown[] {
  const result: NavigationDropdown[] = [];
  const entityArray = Object.values(items.entities) ?? [];
  for (let navGroup of entityArray) {
    if (navGroup!.type === 'dropdown') {
      const newNavGroup: NavigationDropdown = copy(navGroup!);
      for (let navLink of copy(navGroup!.children)) {
        if (navLink.type === 'link') {
          if (navLink.id === id) {
            const newNavLink = copy(navLink);
            navLink.isFavorite = true;
            newNavGroup.children.push(newNavLink);
          }
        }
      }
      result.push(newNavGroup);
    }
  }

  return result;
}

export const navReducer = createReducer(
  initialNavigationState,
  on(loadNavigation, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(
    loadNavigationSuccess,
    (state, action): NavigationStateInterface =>
      adapter.setAll(action.items, { ...state, loaded: true, loading: false })
  ),
  on(
    favoriteChanged,
    (state, action): NavigationStateInterface =>
      adapter.setAll(getItems(state, action.id), {
        ...state,
        loaded: true,
        loading: false,
      })
  ),
  on(
    filterNavigation,
    (state, action): NavigationStateInterface => ({
      ...state,
      filter: action.filter,
    })
  )
);

export function reducers(state: NavigationStateInterface, action: Action) {
  return navReducer(state, action);
}
