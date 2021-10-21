import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icDoNotDisturb from '@iconify/icons-ic/twotone-do-not-disturb';
import icListAlt from '@iconify/icons-ic/twotone-list-alt';
import icLock from '@iconify/icons-ic/twotone-lock';
import icMoveToInbox from '@iconify/icons-ic/twotone-move-to-inbox';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import icOfflineBolt from '@iconify/icons-ic/twotone-offline-bolt';
import icPerson from '@iconify/icons-ic/twotone-person';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icTableChart from '@iconify/icons-ic/twotone-table-chart';
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import { trackById } from '@qad-nx/shared-utils';
import { Icon } from '@visurel/iconify-angular';
import { PopoverRef } from 'libs/shared/ui/popover/src/lib/popover/popover-ref';
import { ToolbarUserService } from 'libs/shared/ui/toolbar-user/src/lib/services/toolbar-user.service';
import { MenuItem } from '../interfaces/menu-item.interface';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: 'qad-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserDropdownComponent implements OnInit {
  items: MenuItem[] = [
    {
      id: '1',
      icon: icAccountCircle,
      label: 'My Profile',
      description: 'Personal Information',
      colorClass: 'text-teal',
      route: '/apps/social',
    },
    {
      id: '2',
      icon: icMoveToInbox,
      label: 'My Inbox',
      description: 'Messages & Latest News',
      colorClass: 'text-primary',
      route: '/apps/chat',
    },
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Online',
      icon: icCheckCircle,
      colorClass: 'text-green',
    },
    {
      id: 'away',
      label: 'Away',
      icon: icAccessTime,
      colorClass: 'text-orange',
    },
    {
      id: 'dnd',
      label: 'Do not disturb',
      icon: icDoNotDisturb,
      colorClass: 'text-red',
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: icOfflineBolt,
      colorClass: 'text-gray',
    },
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;
  icPerson: Icon = icPerson;
  icSettings: Icon = icSettings;
  icChevronRight: Icon = icChevronRight;
  icArrowDropDown: Icon = icArrowDropDown;
  icBusiness: Icon = icBusiness;
  icVerifiedUser: Icon = icVerifiedUser;
  icLock: Icon = icLock;
  icNotificationsOff: Icon = icNotificationsOff;
  user$ = this.toolbarUserService.user$;

  constructor(
    private cd: ChangeDetectorRef,
    private toolbarUserService: ToolbarUserService,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>
  ) {}

  ngOnInit() {}

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close(null);
  }
}
