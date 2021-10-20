import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'apps/eqms/src/environments/environment';
import { AppComponent } from './app.component';
import { WebShellModule } from '@qad-nx/eqms-feature-shell';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebShellModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'availableEnvironments',
      useValue: environment.availableEnvironments,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
