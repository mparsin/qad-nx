import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import icPerson from '@iconify/icons-ic/twotone-person';
import { PopoverService } from '@qad-nx/shared/ui/popover';
import { ToolbarUserDropdownComponent } from '@qad-nx/shared/ui/toolbar-user';
import { Icon } from '@visurel/iconify-angular';
import { ToolbarUserService } from 'libs/shared/ui/toolbar-user/src/lib/services/toolbar-user.service';

@Component({
  selector: 'qad-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserComponent implements OnInit {
  dropdownOpen: boolean = false;
  icPerson: Icon = icPerson;

  constructor(
    private popover: PopoverService,
    private cd: ChangeDetectorRef,
    private toolbarUserService: ToolbarUserService
  ) {}

  private _user: string = '';

  @Input()
  set user(value: string) {
    this._user = value;
    this.toolbarUserService.setUser(value);
  }
  get user(): string {
    return this._user;
  }

  ngOnInit() {}

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ],
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
