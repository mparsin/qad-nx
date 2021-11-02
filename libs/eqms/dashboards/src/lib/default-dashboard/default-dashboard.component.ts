import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import { TranslocoService } from '@ngneat/transloco';
import { select, Store } from '@ngrx/store';
import { currentUserSelector } from '@qad-nx/eqms-auth-data-access';
import { fadeInUp400ms } from '@qad-nx/shared-animations';
import { Icon } from '@visurel/iconify-angular';
import {
  favoriteSelector,
  navFeatureSelector,
} from 'libs/eqms/nav/data-access/src/lib/store/navigation.selector';
import { stagger40ms } from 'libs/shared/animations/src/lib/stagger.animation';
import { appIcons } from 'libs/shared/utils/src/lib/icons/app.icons';
import { map, switchMap, timer } from 'rxjs';

@Component({
  selector: 'qad-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [stagger40ms, fadeInUp400ms],
})
export class DefaultDashboardComponent implements OnInit {
  constructor(
    private store: Store,
    private translateService: TranslocoService
  ) {}

  icSearch: Icon = icSearch;
  icAdd: Icon = appIcons.add;
  icLibraryBooks: Icon = appIcons.libraryBooks;
  currentUser$ = this.store.pipe(select(currentUserSelector));
  favorites$ = this.store.pipe(select(favoriteSelector));

  greeting$ = timer(0, 1000 * 60 * 60).pipe(
    map(() => {
      const today = new Date();
      const curHr = today.getHours();
      if (curHr < 12) {
        return 'greetings.good_morning';
      } else if (curHr < 18) {
        return 'greetings.good_afternoon';
      } else {
        return 'greetings.good_evening';
      }
    }),
    switchMap(val => {
      return this.translateService.selectTranslate(val);
    })
  );

  ngOnInit(): void {
    // this.translateService
    //   .selectTranslate('greetings.good_afternoon')
    //   .subscribe(tr => console.log(tr));
  }

  onSearch() {}

  getSearchLink() {
    return '';
  }

  openSearch() {}
}
