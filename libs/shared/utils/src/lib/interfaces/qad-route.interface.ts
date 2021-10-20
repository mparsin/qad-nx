import { Route } from '@angular/router';

/**
 * Allows to pass data to components via route's data
 */
export interface QadRouteData {
  scrollDisabled?: boolean;
  /**
   * Controls shadow rendering
   */
  toolbarShadowEnabled?: boolean;
  containerEnabled?: boolean;

  [key: string]: boolean | undefined;
}

/**
 * Strongly-typed route with data and children
 */
export interface QadRoute extends Route {
  data?: QadRouteData;
  children?: QadRoute[];
}

export type QadRoutes = QadRoute[];
