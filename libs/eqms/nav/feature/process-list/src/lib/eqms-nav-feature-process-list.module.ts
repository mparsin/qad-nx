import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedUiSidenavModule } from '@qad-nx/shared/ui/sidenav';
import { ProcessListComponent } from './process-list/process-list.component';

@NgModule({
  imports: [CommonModule, SharedUiSidenavModule, MatProgressBarModule],
  declarations: [ProcessListComponent],
  exports: [ProcessListComponent],
})
export class EqmsNavFeatureProcessListModule {}
