import { AuthGuard } from '@qad-nx/eqms-auth-data-access';
import { QadRoutes } from '@qad-nx/shared-utils';
import { CustomLayoutComponent } from '@qad-nx/eqms-feature-shell';
import { NavigationResolver } from 'libs/eqms/nav/data-access/src/lib/navigation.resolver';

export const webShellRoutes: QadRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
    resolve: {
      items: NavigationResolver,
    },
    children: [
      {
        path: 'dashboards/default',
        redirectTo: '/',
      },
      {
        path: 'process',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './../../../search/feature/search-page/src/lib/eqms-search-feature-search-page.module'
              ).then(m => m.EqmsSearchFeatureSearchPageModule),
          },
        ],
      },
      {
        path: '',
        loadChildren: () =>
          import('./../../../dashboards/src/lib/eqms-dashboards.module').then(
            m => m.EqmsDashboardsModule
          ),
      },
    ],
  },
];
