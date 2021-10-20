import { AuthGuard } from '@qad-nx/eqms-auth-data-access';
import { QadRoutes } from '@qad-nx/shared-utils';
import { CustomLayoutComponent } from '@qad-nx/eqms-feature-shell';

export const webShellRoutes: QadRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
  },
];
