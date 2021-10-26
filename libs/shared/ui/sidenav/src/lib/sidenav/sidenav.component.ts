import { Component, Input } from '@angular/core';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import {
  ConfigService,
  LayoutService,
  NavigationService,
  trackByRoute,
} from '@qad-nx/shared-utils';

import { map } from 'rxjs/operators';
import { Icon } from '@visurel/iconify-angular';

@Component({
  selector: 'qad-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() collapsed: boolean | null = null;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(
    map(config => config.sidenav.imageUrl)
  );
  showCollapsePin$ = this.configService.config$.pipe(
    map(config => config.sidenav.showCollapsePin)
  );

  items$ = this.navigationService.items$;
  trackByRoute = trackByRoute;
  icRadioButtonChecked: Icon = icRadioButtonChecked;
  icRadioButtonUnchecked: Icon = icRadioButtonUnchecked;
  filter: string = '';

  constructor(
    private navigationService: NavigationService,
    private layoutService: LayoutService,
    private configService: ConfigService
  ) {}

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
}
