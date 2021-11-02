import { Injectable } from '@angular/core';
import {
  NavigationDropdown,
  NavigationItem,
  NavigationLink,
  NavigationSubheading,
} from '@qad-nx/shared-utils';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  itemsSubject$ = new BehaviorSubject<NavigationItem[]>([]);
  items$ = this.itemsSubject$.asObservable();
  loading$: Observable<boolean> = new Observable<boolean>();

  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  private _favoritesChangeSubject = new Subject<number>();
  favoritesChange$ = this._favoritesChangeSubject.asObservable();

  constructor() {}

  triggerOpenChange(item: NavigationDropdown) {
    this._openChangeSubject.next(item);
  }

  isLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'link';
  }

  isDropdown(item: NavigationItem): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  isSubheading(item: NavigationItem): item is NavigationSubheading {
    return item.type === 'subheading';
  }

  setItems(items: NavigationItem[]) {
    this.itemsSubject$.next(items);
  }

  addToFavorites(item: NavigationLink) {
    this._favoritesChangeSubject.next(item.id);
  }
}
