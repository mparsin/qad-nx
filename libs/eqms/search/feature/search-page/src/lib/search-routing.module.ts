import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchPageComponent } from '@qad-nx/eqms/search/feature/search-page';
import { SearchResolver } from 'libs/eqms/search/data-access/src/lib/search.resolver';

const routes: Routes = [
  {
    path: ':systemName',
    component: SearchPageComponent,
    resolve: {
      search: SearchResolver,
    },
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
