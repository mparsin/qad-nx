import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { AppState } from '@qad-nx/eqms-feature-shell';
import {
  favoriteChanged,
  filterNavigation,
} from '@qad-nx/eqms/nav/data-access';
import {
  NavigationDropdown,
  NavigationLink,
  NavigationService,
} from '@qad-nx/shared-utils';
import {
  isLoadedSelector,
  isLoadingSelector,
  itemsSelector,
} from 'libs/eqms/nav/data-access/src/lib/store/navigation.selector';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'eqms-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessListComponent implements OnInit {
  @Input() collapsed: boolean | null = null;
  isLoading$ = this.store.pipe(select(isLoadingSelector));
  items$: Observable<NavigationDropdown[]> = this.store.pipe(
    select(itemsSelector)
  );

  isLoaded$ = this.store.select(isLoadedSelector);

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService
  ) {
    navigationService.favoritesChange$
      .pipe(untilDestroyed(this))
      .subscribe(val =>
        this.store.dispatch(favoriteChanged({ id: val, value: true }))
      );
  }

  ngOnInit(): void {}

  onFilterChanged(filter: string) {
    this.store.dispatch(filterNavigation({ filter: filter }));
  }

  favoritesChanged(item: NavigationLink) {
    this.store.dispatch(
      favoriteChanged({ id: item.id, value: item.isFavorite! })
    );
  }
}
