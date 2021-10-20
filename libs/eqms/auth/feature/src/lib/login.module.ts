import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedUiMessagesModule } from '@qad-nx/shared/ui/messages';
import { LoginComponent } from './login.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, reducers, AuthEffects } from '@qad-nx/eqms-auth-data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { IconModule } from '@visurel/iconify-angular';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';

const ROUTES: Route[] = [
  {
    path: 'auth',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(authFeatureKey, reducers),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    IconModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MarkdownModule.forRoot(),
    MatButtonModule,
    SharedUiMessagesModule
  ],
  exports: [],
})
export class LoginModule {}
