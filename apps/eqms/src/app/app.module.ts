import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from 'apps/eqms/src/app/transloco/transloco-root.module';
import { environment } from 'apps/eqms/src/environments/environment';
import { AppComponent } from './app.component';
import { ShellModule } from '@qad-nx/eqms-feature-shell';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoRootModule,
    ShellModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'eqms' },
    {
      provide: 'availableEnvironments',
      useValue: environment.availableEnvironments,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
