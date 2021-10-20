import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelativeDateTimeModule } from '@qad-nx/shared-utils';
import { SharedUiPopoverModule } from '@qad-nx/shared/ui/popover';
import { ToolbarNotificationsComponent } from './toolbar-notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { ToolbarNotificationsDropdownComponent } from './toolbar-notifications-dropdown/toolbar-notifications-dropdown.component';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [
    ToolbarNotificationsComponent,
    ToolbarNotificationsDropdownComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedUiPopoverModule,
    FlexLayoutModule,
    MatTabsModule,
    MatMenuModule,
    RelativeDateTimeModule,
    RouterModule,
    MatRippleModule,
    IconModule,
  ],
  exports: [ToolbarNotificationsComponent],
  entryComponents: [ToolbarNotificationsDropdownComponent],
})
export class ToolbarNotificationsModule {}
