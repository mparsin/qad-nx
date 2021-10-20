import { ChangeDetectorRef, Directive, HostBinding } from '@angular/core';
import { ConfigService } from '@qad-nx/shared-utils';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[qadContainer]',
})
export class ContainerDirective {
  @HostBinding('class.container') enabled = false;

  constructor(
    private configService: ConfigService,
    private cd: ChangeDetectorRef
  ) {
    this.configService.config$
      .pipe(
        map(config => config.boxed),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(boxed => {
        this.enabled = boxed;
        this.cd.markForCheck();
      });
  }
}
