import { Route } from '@angular/router';
import { AuthGuard } from '@qad-nx/eqms-utils';
import { LayoutComponent } from '@qad-nx/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard]
  }
]
