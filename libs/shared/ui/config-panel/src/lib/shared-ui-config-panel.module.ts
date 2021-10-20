import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslocoModule } from '@ngneat/transloco';
import { IconModule } from '@visurel/iconify-angular';
import {
  ConfigPanelComponent,
  ConfigPanelToggleComponent,
} from '@qad-nx/shared/ui/config-panel';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatRadioModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatRippleModule,
    TranslocoModule,
  ],
  declarations: [ConfigPanelComponent, ConfigPanelToggleComponent],
  exports: [ConfigPanelComponent, ConfigPanelToggleComponent],
})
export class SharedUiConfigPanelModule {}
