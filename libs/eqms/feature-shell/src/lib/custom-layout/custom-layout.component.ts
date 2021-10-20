import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  checkRouterChildsData,
  ConfigService,
  LayoutService,
} from '@qad-nx/shared-utils';
import { filter, map, startWith } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'eqms-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss'],
})
export class CustomLayoutComponent {
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(
    map(config => config.footer.visible)
  );
  isDesktop$ = this.layoutService.isDesktop$;

  /**
   * Toolbar shadow can be controlled via routing configuration
   */
  toolbarShadowEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(this.router.routerState.root.snapshot, data =>
        data.toolbarShadowEnabled ? data.toolbarShadowEnabled : false
      )
    )
  );

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router
  ) {}
}
