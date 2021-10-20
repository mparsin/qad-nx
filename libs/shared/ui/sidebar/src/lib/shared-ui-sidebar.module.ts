import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@qad-nx/shared/ui/sidebar';

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SharedUiSidebarModule {}
