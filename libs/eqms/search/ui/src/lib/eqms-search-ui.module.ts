import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SearchMenuComponent } from './search-menu/search-menu.component';

@NgModule({
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule],
  exports: [SearchMenuComponent],
  declarations: [SearchMenuComponent],
})
export class EqmsSearchUiModule {}
