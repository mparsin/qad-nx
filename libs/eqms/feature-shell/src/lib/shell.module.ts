import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  RouterState,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from '@qad-nx/eqms-auth-data-access';
import { LoginModule } from '@qad-nx/eqms-auth-feature';
import { CustomLayoutComponent } from '@qad-nx/eqms-feature-shell';
import {
  NavigationEffect,
  NavigationModule,
} from '@qad-nx/eqms/nav/data-access';
import { EqmsNavFeatureProcessListModule } from '@qad-nx/eqms/nav/feature/process-list';
import { LayoutModule } from '@qad-nx/shared-feature-layout';
import { SharedUiConfigPanelModule } from '@qad-nx/shared/ui/config-panel';
import { SharedUiFooterModule } from '@qad-nx/shared/ui/footer';
import { SharedUiSidebarModule } from '@qad-nx/shared/ui/sidebar';
import { SharedUiSidenavModule } from '@qad-nx/shared/ui/sidenav';
import { SharedUiToolbarModule } from '@qad-nx/shared/ui/toolbar';
import { environment } from 'apps/eqms/src/environments/environment';
import { JwtInterceptor } from 'libs/eqms/auth/data-access/src/lib/utils/jwt.interceptor';
import { webShellRoutes } from './web-shell.routes';

export interface AppState {}

const rootReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
    LoginModule,
    NavigationModule,
    StoreModule.forRoot(rootReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
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
    EqmsNavFeatureProcessListModule,
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class ShellModule {}
