import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SharedUiToolbarUserModule } from '@qad-nx/shared/ui/toolbar-user';
import { IconModule } from '@visurel/iconify-angular';
import { LanguagesComponent } from 'libs/shared/ui/toolbar/src/lib/languages-menu/languages.component';
import { ToolbarNotificationsModule } from 'libs/shared/ui/toolbar/src/lib/toolbar/toolbar-notifications/toolbar-notifications.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent, LanguagesComponent],
  imports: [
    CommonModule,
    ExtendedModule,
    MatIconModule,
    IconModule,
    RouterModule,
    MatMenuModule,
    FlexModule,
    MatButtonModule,
    ToolbarNotificationsModule,
    SharedUiToolbarUserModule,
    IconModule,
  ],
  exports: [ToolbarComponent, LanguagesComponent],
})
export class SharedUiToolbarModule {}
