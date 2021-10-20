import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { WebLayoutModule } from '@qad-nx/shared-feature-layout';
import { SharedUiConfigPanelModule } from '@qad-nx/shared/ui/config-panel';
import { SharedUiFooterModule } from '@qad-nx/shared/ui/footer';
import { SharedUiSidebarModule } from '@qad-nx/shared/ui/sidebar';
import { SharedUiSidenavModule } from '@qad-nx/shared/ui/sidenav';
import { SharedUiToolbarModule } from '@qad-nx/shared/ui/toolbar';
import { CustomLayoutComponent } from 'libs/eqms/feature-shell/src/lib/custom-layout/custom-layout.component';
import { webShellRoutes } from './web-shell.routes';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from '@qad-nx/shared-utils';
import { LoginModule } from '@qad-nx/eqms-auth-feature';

const rootReducers = {
  router: routerReducer,
};

@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top'
    }),
    LoginModule,
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false //TODO: set based on active environment
    }),
    WebLayoutModule,
    SharedUiFooterModule,
    SharedUiToolbarModule,
    SharedUiSidenavModule,
    SharedUiConfigPanelModule,
    SharedUiSidebarModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class WebShellModule {}
