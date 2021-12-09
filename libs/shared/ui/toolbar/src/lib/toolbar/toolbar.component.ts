import { Component, HostBinding, Input, OnInit } from '@angular/core';
import icBookmarks from '@iconify/icons-ic/twotone-bookmarks';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { ConfigService, LayoutService } from '@qad-nx/shared-utils';
import { map } from 'rxjs/operators';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icAssignmentTurnedIn from '@iconify/icons-ic/twotone-assignment-turned-in';
import icBallot from '@iconify/icons-ic/twotone-ballot';
import icDescription from '@iconify/icons-ic/twotone-description';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icSearch from '@iconify/icons-ic/twotone-search';
import { Icon } from '@visurel/iconify-angular';

/**
 * Toolbar component.
 * JSDoc comment
 */
@Component({
  selector: 'qad-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() mobileQuery = false;
  @Input() user: string = '';

  @Input()
  @HostBinding('class.shadow-b')
  hasShadow: boolean | null = false;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));

  // navigationItems$ = this.navigationService.items$;

  isHorizontalLayout$ = this.configService.config$.pipe(
    map(config => config.layout === 'horizontal')
  );
  isVerticalLayout$ = this.configService.config$.pipe(
    map(config => config.layout === 'vertical')
  );
  isNavbarInToolbar$ = this.configService.config$.pipe(
    map(config => config.navbar.position === 'in-toolbar')
  );
  // isNavbarBelowToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'below-toolbar'));

  icSearch: Icon = icSearch;
  icBookmarks: Icon = icBookmarks;
  icMenu: Icon = icMenu;
  icPersonAdd: Icon = icPersonAdd;
  icAssignmentTurnedIn: Icon = icAssignmentTurnedIn;
  icBallot: Icon = icBallot;
  icDescription: Icon = icDescription;
  icAssignment: Icon = icAssignment;
  icReceipt: Icon = icReceipt;
  // icDoneAll: Icon = icDoneAll;
  icArrowDropDown: Icon = icArrowDropDown;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService
  ) {}

  ngOnInit() {}

  openQuickpanel() {
    this.layoutService.openQuickpanel();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  openSearch() {
    this.layoutService.openSearch();
  }

  logout() {
    console.log('Logging out');
  }
}
