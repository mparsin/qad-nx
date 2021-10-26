import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarComponent } from 'libs/shared/ui/scrollbar/src/lib/scrollbar.component';

@NgModule({
  declarations: [ScrollbarComponent],
  imports: [CommonModule],
  exports: [ScrollbarComponent],
})
export class SharedUiScrollbarModule {}
