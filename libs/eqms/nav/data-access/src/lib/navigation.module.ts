import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { navFeatureKey, reducers } from '@qad-nx/eqms/nav/data-access';

@NgModule({
  imports: [StoreModule.forFeature(navFeatureKey, reducers)],
})
export class NavigationModule {}
