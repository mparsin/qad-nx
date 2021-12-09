import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { loginSuccessAction } from '@qad-nx/eqms-auth-data-access';
import { NavigationService, PersistenceService } from '@qad-nx/shared-utils';
import { filter } from 'rxjs/operators';

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
    store: Store,
    persistentService: PersistenceService,
    translocoService: TranslocoService
  ) {
    const user = persistentService.getUser();
    if (user) {
      store.dispatch(
        loginSuccessAction({ currentUser: user, redirectUrl: undefined })
      );
    }
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
        this.setItems();
      });
    // translocoService.langChanges$.pipe(untilDestroyed(this)).subscribe(event => {
    //   console.log('event', event);
    //   this.setItems();
    // })
  }

  private setItems() {
    // this.navigationService.setItems([
    //   {
    //     type: 'link',
    //     label: translate('eqms.dashboard'),
    //     route: '/',
    //     icon: icLayers,
    //   },
    //   {
    //     type: 'subheading',
    //     label: 'Layout',
    //     children: [
    //       {
    //         type: 'link',
    //         label: translate('eqms.all_in_one_table'),
    //         route: '/test',
    //         icon: icAssigment,
    //       },
    //     ],
    //   },
    // ]);
  }
}
