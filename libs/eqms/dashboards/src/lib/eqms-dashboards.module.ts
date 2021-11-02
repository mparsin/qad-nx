import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { IconModule } from '@visurel/iconify-angular';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultDashboardComponent,
    pathMatch: 'full',
  },
];

export const loader = ['en', 'ru'].reduce((acc: any, lang) => {
  acc[lang] = () => import(`./i18n/${lang}.json`);
  return acc;
}, {});

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    TranslocoModule,
    MatTooltipModule,
    MatIconModule,
    MatRippleModule,
  ],
  declarations: [DefaultDashboardComponent],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'eqms',
      },
    },
  ],
})
export class EqmsDashboardsModule {}
