import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import {
  currentUserSelector,
  logoutAction,
} from '@qad-nx/eqms-auth-data-access';
import {
  checkRouterChildsData,
  ConfigService,
  LayoutService,
} from '@qad-nx/shared-utils';
import { IconService } from '@visurel/iconify-angular';
import { ToolbarUserService } from 'libs/shared/ui/toolbar-user/src/lib/services/toolbar-user.service';
import { appIcons } from 'libs/shared/utils/src/lib/icons/app.icons';
import { filter, map, startWith, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'eqms-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss'],
})
export class CustomLayoutComponent implements OnInit {
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(
    map(config => config.footer.visible)
  );
  isDesktop$ = this.layoutService.isDesktop$;
  user: string = '';

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
    private router: Router,
    private store: Store,
    private iconService: IconService,
    private toolbarUserService: ToolbarUserService
  ) {
    iconService.registerAll(appIcons);
    // store.dispatch(loadNavigation());
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(currentUserSelector),
        untilDestroyed(this),
        tap(r => (this.user = r ? r.fullName : 'unknown'))
      )
      .subscribe();

    this.toolbarUserService.logout$
      .pipe(
        untilDestroyed(this),
        tap(() => this.store.dispatch(logoutAction()))
      )
      .subscribe();
  }
}
