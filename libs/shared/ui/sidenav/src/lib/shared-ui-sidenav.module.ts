import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconModule } from '@visurel/iconify-angular';
import { SidenavItemModule } from 'libs/shared/ui/sidenav/src/lib/sidenav/sidenav-item/sidenav-item.module';
import { SidenavComponent } from 'libs/shared/ui/sidenav/src/lib/sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    SidenavItemModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
  ],
  exports: [SidenavComponent],
})
export class SharedUiSidenavModule {}
