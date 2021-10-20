import { Component, Inject, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ConfigService, LayoutService, StyleService, Style } from '@qad-nx/shared-utils';
import { map, take } from 'rxjs/operators';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icCheck from '@iconify/icons-ic/twotone-check';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import icClose from '@iconify/icons-ic/twotone-close';
import { Icon } from '@visurel/iconify-angular';
import { ColorVariable, colorVariables } from '@qad-nx/shared/ui/config-panel'
import { ConfigName } from '@qad-nx/shared-utils'


/**
 * Class representing a config panel
 */
@Component({
  selector: 'qad-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss']
})
export class ConfigPanelComponent implements OnInit {

  configs = this.configService.configs;
  colorVariables = colorVariables;

  config$ = this.configService.config$;
  activeConfig$ = this.configService.config$.pipe(
    map(config => Object.keys(this.configService.configs).find((key: any) => this.configService.configs[key] === config))
  );

  isRTL$ = this.route.queryParamMap.pipe(
    map(paramMap => coerceBooleanProperty(paramMap.get('rtl'))),
    take(1)
  );

  selectedStyle$ = this.styleService.style$;

  icSettings: Icon = icSettings;
  icCheck: Icon = icCheck;
  icClose: Icon = icClose;
  ConfigName = ConfigName;
  Style = Style;
  selectedColor = colorVariables.blue;

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private layoutService: LayoutService,
              @Inject(DOCUMENT) private document: Document,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  /**
   * Sets layout and style
   * @param layout - selected layout
   * @param style - selected style
   */
  setConfig(layout: ConfigName, style: Style) {
    this.configService.setConfig(layout);
    this.styleService.setStyle(style);
  }

  /**
   * Sets primary color and primary contrast color to the selected value
   * @param color - selected color variable
   */
  selectColor(color: ColorVariable) {
    this.selectedColor = color;
    if (this.document) {
      this.document.documentElement.style.setProperty('--color-primary', color.default.replace('rgb(', '').replace(')', ''));
      this.document.documentElement.style.setProperty('--color-primary-contrast', color.contrast.replace('rgb(', '').replace(')', ''));
    }
  }

  isSelectedColor(color: ColorVariable) {
    return color === this.selectedColor;
  }

  enableDarkMode() {
    this.styleService.setStyle(Style.dark);
  }

  disableDarkMode() {
    this.styleService.setStyle(Style.default);
  }

  sidenavOpenChange(change: MatSlideToggleChange) {
    change.checked ? this.layoutService.openSidenav() : this.layoutService.closeSidenav();
  }

  layoutRTLChange(change: MatSlideToggleChange) {
    change.checked ? this.layoutService.enableRTL() : this.layoutService.disableRTL();
  }

  toolbarPositionChange(change: MatRadioChange) {
    this.configService.updateConfig({
      toolbar: {
        fixed: change.value === 'fixed'
      }
    });
  }

  footerVisibleChange(change: MatSlideToggleChange) {
    this.configService.updateConfig({
      footer: {
        visible: change.checked
      }
    });
  }

  footerPositionChange(change: MatRadioChange) {
    this.configService.updateConfig({
      footer: {
        fixed: change.value === 'fixed'
      }
    });
  }


  /*
  sidenavCollapsedChange(change: MatCheckboxChange) {
    this.layoutService.setCollapsed(change.checked);
  }

  toolbarVisibleChange(change: MatSlideToggleChange) {
    this.configService.setToolbarVisible(change.checked);
  }

  toolbarPositionChange(change: MatRadioChange) {
    this.configService.setToolbarPosition(change.value);
  }

  footerPositionChange(change: MatRadioChange) {
    this.configService.setFooterPosition(change.value);
  }
  */

}
