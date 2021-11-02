import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchPageComponent } from '@qad-nx/eqms/search/feature/search-page';

const routes: Routes = [
  {
    path: ':systemName',
    component: SearchPageComponent,
    data: {
      scrollDisabled: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
