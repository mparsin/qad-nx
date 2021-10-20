import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from 'libs/shared/ui/popover/src/lib/popover/popover.component';

@NgModule({
  declarations: [PopoverComponent],
  imports: [CommonModule],
  entryComponents: [PopoverComponent]
})
export class SharedUiPopoverModule {}
