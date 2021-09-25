import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WebShellModule } from '@qad-nx/web/shell/feature';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
