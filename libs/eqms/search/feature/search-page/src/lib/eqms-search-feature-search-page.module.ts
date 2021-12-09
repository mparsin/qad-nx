import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  reducers,
  SearchEffect,
  searchFeatureKey,
  SearchResolver,
} from '@qad-nx/eqms/search/data-access';
import {
  SearchPageComponent,
  SearchRoutingModule,
} from '@qad-nx/eqms/search/feature/search-page';
import { EqmsSearchUiModule } from '@qad-nx/eqms/search/ui';
import { SharedDirectivesContainerModule } from '@qad-nx/shared/directives/container';
import { IconModule } from '@visurel/iconify-angular';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    TranslocoModule,
    AgGridModule.withComponents(),
    StoreModule.forFeature(searchFeatureKey, reducers),
    EffectsModule.forFeature([SearchEffect]),
    IconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    SharedDirectivesContainerModule,
    EqmsSearchUiModule,
  ],
  declarations: [SearchPageComponent],
  providers: [SearchResolver],
})
export class EqmsSearchFeatureSearchPageModule {}
