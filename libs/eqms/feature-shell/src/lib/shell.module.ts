import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from '@qad-nx/eqms-auth-data-access';
import { LayoutModule } from '@qad-nx/shared-feature-layout';
import { SharedUiConfigPanelModule } from '@qad-nx/shared/ui/config-panel';
import { SharedUiFooterModule } from '@qad-nx/shared/ui/footer';
import { SharedUiSidebarModule } from '@qad-nx/shared/ui/sidebar';
import { SharedUiSidenavModule } from '@qad-nx/shared/ui/sidenav';
import { SharedUiToolbarModule } from '@qad-nx/shared/ui/toolbar';
import { CustomLayoutComponent } from '@qad-nx/eqms-feature-shell';
import { NavigationEffect } from 'libs/eqms/nav/data-access/src/lib/store/navigation.effect';
import { webShellRoutes } from './web-shell.routes';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginModule } from '@qad-nx/eqms-auth-feature';

const rootReducers = {
  router: routerReducer,
};

@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
    LoginModule,
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([NavigationEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false, //TODO: set based on active environment
    }),
    LayoutModule,
    SharedUiFooterModule,
    SharedUiToolbarModule,
    SharedUiSidenavModule,
    SharedUiConfigPanelModule,
    SharedUiSidebarModule,
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class ShellModule {}
