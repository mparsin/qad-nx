import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SharedDirectivesContainerModule } from '@qad-nx/shared/directives/container';
import { FooterComponent } from 'libs/shared/ui/footer/src/lib/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, FlexModule, MatButtonModule, ExtendedModule, SharedDirectivesContainerModule],
  exports: [FooterComponent]
})
export class SharedUiFooterModule {}
