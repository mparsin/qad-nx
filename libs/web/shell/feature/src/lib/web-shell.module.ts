import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { webShellRoutes } from './web-shell.routes';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from '@qad-nx/web/shared/utils';
import { LoginModule } from '@qad-nx/web/auth/feature';

const rootReducers = {
  router: routerReducer
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top'
    }),
    LoginModule,
    StoreModule.forRoot(rootReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false, //TODO: set based on active environment
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class WebShellModule {
}
