import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';
import { ToolbarNotificationsModule } from 'libs/shared/ui/toolbar/src/lib/toolbar/toolbar-notifications/toolbar-notifications.module';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, ExtendedModule, MatIconModule, IconModule, RouterModule, MatMenuModule, FlexModule, MatButtonModule, ToolbarNotificationsModule],
  exports: [ToolbarComponent]
})
export class SharedUiToolbarModule {}
