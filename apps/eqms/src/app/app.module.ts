import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from 'apps/eqms/src/app/transloco/transloco-root.module';
import { environment } from 'apps/eqms/src/environments/environment';
import { JwtInterceptor } from 'libs/eqms/auth/data-access/src/lib/utils/jwt.interceptor';
import { NavigationResolver } from 'libs/eqms/nav/data-access/src/lib/navigation.resolver';
import { AppComponent } from './app.component';
import { ShellModule } from '@qad-nx/eqms-feature-shell';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
    NavigationResolver,
    { provide: TRANSLOCO_SCOPE, useValue: 'eqms' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'availableEnvironments',
      useValue: environment.availableEnvironments,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
