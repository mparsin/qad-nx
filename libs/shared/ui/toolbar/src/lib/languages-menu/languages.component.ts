import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import emojioneUS from '@iconify/icons-emojione/flag-for-flag-united-states';
import emojioneRU from '@iconify/icons-emojione/flag-for-flag-russia';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { Icon } from '@visurel/iconify-angular';

@Component({
  selector: 'qad-languages',
  templateUrl: './languages.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'qad-languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
  availableLangs!: AvailableLangs;
  activeLang?: string = undefined;
  flagCodes: { [key: string]: string } | null = null;

  /**
   * Constructor
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translocoService: TranslocoService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the available languages from transloco
    this.availableLangs = this.translocoService.getAvailableLangs();

    // Subscribe to language changes
    this.translocoService.langChanges$.subscribe(activeLang => {
      // Get the active lang
      this.activeLang = activeLang;

      // Update the navigation
      this._updateNavigation(activeLang);
    });

    // Set the country iso codes for languages for flags
    this.flagCodes = {
      en: 'us',
      ru: 'ru',
    };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the active lang
   *
   * @param lang
   */
  setActiveLang(lang: string): void {
    // Set the active lang
    this.translocoService.setActiveLang(lang);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: { id: string }): string | number {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  getFlagIcon(lang: string): Icon {
    switch (lang) {
      case 'en':
        return emojioneUS;
      case 'ru':
        return emojioneRU;
      default:
        return emojioneUS;
    }
  }

  /**
   * Update the navigation
   *
   * @param lang
   * @private
   */
  private _updateNavigation(lang: string): void {}
}
