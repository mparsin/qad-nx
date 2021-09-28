import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadErrorComponent } from './load-error/load-error.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoadErrorComponent
  ],
  exports: [
    LoadErrorComponent
  ]
})
export class SharedUiMessagesModule {}
