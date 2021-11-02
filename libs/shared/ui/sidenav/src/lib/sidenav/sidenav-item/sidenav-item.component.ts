import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  LayoutService,
  NavigationDropdown,
  NavigationItem,
  NavigationLink,
  NavigationService,
} from '@qad-nx/shared-utils';

import { Icon } from '@visurel/iconify-angular';
import { dropdownAnimation } from 'libs/shared/animations/src/lib/dropdown.animation';
import { appIcons } from 'libs/shared/utils/src/lib/icons/app.icons';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'qad-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [dropdownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemComponent implements OnInit, OnChanges {
  @Input() item!: NavigationItem;
  @Input() level = 0;

  collapsed$ = this.layoutService.sidenavCollapsedOpen$.pipe(
    withLatestFrom(this.layoutService.sidenavCollapsed$),
    map(([first, second]) => {
      return !first && second;
    })
  );

  isOpen = false;
  isActive = false;
  icKeyboardArrowRight: any = icKeyboardArrowRight;
  isLink = this.navigationService.isLink;
  isDropdown = this.navigationService.isDropdown;
  isSubheading = this.navigationService.isSubheading;
  icStar: Icon = appIcons.star;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private navigationService: NavigationService,
    private layoutService: LayoutService
  ) {}

  @HostBinding('class')
  get levelClass() {
    return `item-level-${this.level}`;
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter(() => this.isDropdown(this.item)),
        untilDestroyed(this)
      )
      .subscribe(() => this.onRouteChange());

    this.navigationService.openChange$
      .pipe(
        filter(() => this.isDropdown(this.item)),
        untilDestroyed(this)
      )
      .subscribe(item => this.onOpenChange(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line no-prototype-builtins
    if (
      changes &&
      changes.hasOwnProperty('item') &&
      this.isDropdown(this.item)
    ) {
      this.onRouteChange();
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
    this.cd.markForCheck();
  }

  onOpenChange(item: NavigationDropdown) {
    if (this.isChildrenOf(this.item as NavigationDropdown, item)) {
      return;
    }

    if (this.hasActiveChilds(this.item as NavigationDropdown)) {
      return;
    }

    if (this.item !== item) {
      this.isOpen = false;
      this.cd.markForCheck();
    }
  }

  onRouteChange() {
    if (this.hasActiveChilds(this.item as NavigationDropdown)) {
      this.isActive = true;
      this.isOpen = true;
      this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
      this.cd.markForCheck();
    } else {
      this.isActive = false;
      this.isOpen = false;
      this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
      this.cd.markForCheck();
    }
  }

  isChildrenOf(parent: NavigationDropdown, item: NavigationDropdown): boolean {
    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    return parent.children
      .filter(child => this.isDropdown(child))
      .some(child => this.isChildrenOf(child as NavigationDropdown, item));
  }

  hasActiveChilds(parent: NavigationDropdown): boolean {
    return parent.children.some((child: any) => {
      if (this.isDropdown(child)) {
        return this.hasActiveChilds(child);
      }
      if (this.isLink(child) && !this.isFunction(child.route)) {
        return this.router.isActive(child.route as string, false);
      }
      return false;
    });
  }

  isFunction(prop: NavigationLink['route']) {
    return prop instanceof Function;
  }

  getIcon(item: NavigationLink | NavigationDropdown): Icon | string {
    return item.icon ? item.icon : '';
  }

  toggleFavorites(params: { event: Event; item: NavigationItem }) {
    params.event.preventDefault();
    params.event.stopPropagation();
    if (this.item.type === 'link') {
      this.navigationService.addToFavorites(this.item);
      console.log('Add to favorites', params.item);
    }
    return false;
  }
}
