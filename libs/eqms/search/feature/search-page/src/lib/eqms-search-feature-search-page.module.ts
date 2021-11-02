import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { SearchRoutingModule } from '@qad-nx/eqms/search/feature/search-page';
import { SearchPageComponent } from '@qad-nx/eqms/search/feature/search-page';

@NgModule({
  imports: [CommonModule, SearchRoutingModule, TranslocoModule],
  declarations: [SearchPageComponent],
})
export class EqmsSearchFeatureSearchPageModule {}
