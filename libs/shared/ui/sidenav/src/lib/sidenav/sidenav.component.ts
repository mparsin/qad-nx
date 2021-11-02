import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import {
  ConfigService,
  LayoutService,
  NavigationItem,
  NavigationService,
  trackByRoute,
} from '@qad-nx/shared-utils';
import { Icon } from '@visurel/iconify-angular';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
} from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
  selector: 'qad-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() collapsed: boolean | null = null;
  @Input() items$: Observable<NavigationItem[]> = new Observable<
    NavigationItem[]
  >();
  @Input() isLoaded$: Observable<boolean> = new Observable<boolean>();
  @Input() isLoading$: Observable<boolean> = new Observable<boolean>();
  @Output() filterChanged = new EventEmitter();
  @Output() favoritesChanges = new EventEmitter();
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(
    map(config => config.sidenav.imageUrl)
  );
  showCollapsePin$ = this.configService.config$.pipe(
    map(config => config.sidenav.showCollapsePin)
  );

  // items$ = this.navigationService.items$;
  trackByRoute = trackByRoute;
  icRadioButtonChecked: Icon = icRadioButtonChecked;
  icRadioButtonUnchecked: Icon = icRadioButtonUnchecked;
  filter: string = '';
  private filterChanged$ = new BehaviorSubject<string>('');

  constructor(
    private navigationService: NavigationService,
    private layoutService: LayoutService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.filterChanged$
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(val => this.filterChanged.emit(val));
  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }

  onFilterChanged() {
    this.filterChanged$.next(this.filter);
  }

  favoritesChanged(item: any) {
    console.log('favoritesChanged', item);
    // this.favoritesChanges.emit(item);
  }
}
