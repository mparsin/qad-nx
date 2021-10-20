import { Component } from '@angular/core';
import { translate, TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NavigationService } from '@qad-nx/shared-utils';
import { filter } from 'rxjs/operators';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';

@UntilDestroy()
@Component({
  selector: 'eqms-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eqms';

  constructor(
    private navigationService: NavigationService,
    translocoService: TranslocoService
  ) {
    translocoService.load('en').pipe(untilDestroyed(this)).subscribe();
    translocoService.events$
      .pipe(
        untilDestroyed(this),
        filter(
          (event: any) =>
            event.type === 'translationLoadSuccess' &&
            event.payload.scope === 'eqms'
        )
      )
      .subscribe(() => {
        const translations = translocoService.translateObject('eqms');
        console.log(translations);
        this.setItems();
      });
    // translocoService.langChanges$.pipe(untilDestroyed(this)).subscribe(event => {
    //   console.log('event', event);
    //   this.setItems();
    // })
  }

  private setItems() {
    this.navigationService.setItems([
      {
        type: 'link',
        label: translate('eqms.dashboard'),
        route: '/',
        icon: icLayers,
      },
      {
        type: 'subheading',
        label: 'Layout',
        children: [
          {
            type: 'link',
            label: translate('eqms.all_in_one_table'),
            route: '/test',
            icon: icAssigment,
          },
        ],
      },
    ]);
  }
}
