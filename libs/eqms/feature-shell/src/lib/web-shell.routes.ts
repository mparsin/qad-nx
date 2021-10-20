import { AuthGuard, QadRoutes } from '@qad-nx/shared-utils';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';

export const webShellRoutes: QadRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
  },
];
