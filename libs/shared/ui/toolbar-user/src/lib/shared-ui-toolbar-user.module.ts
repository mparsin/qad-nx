import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { RelativeDateTimeModule } from '@qad-nx/shared-utils';
import { IconModule } from '@visurel/iconify-angular';
import {
  ToolbarUserComponent,
  ToolbarUserDropdownComponent,
} from '@qad-nx/shared/ui/toolbar-user';
import { ToolbarUserService } from 'libs/shared/ui/toolbar-user/src/lib/services/toolbar-user.service';

@NgModule({
  declarations: [ToolbarUserComponent, ToolbarUserDropdownComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    RelativeDateTimeModule,
    RouterModule,
    MatTooltipModule,
    IconModule,
  ],
  exports: [ToolbarUserComponent],
  entryComponents: [ToolbarUserDropdownComponent],
  providers: [ToolbarUserService],
})
export class SharedUiToolbarUserModule {}
