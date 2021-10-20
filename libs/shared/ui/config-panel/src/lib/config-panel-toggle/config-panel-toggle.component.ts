import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import icSettings from '@iconify/icons-ic/twotone-settings';
import { Icon } from '@visurel/iconify-angular';

/**
 * Config panel toggle button.
 * @remarks Controls visibility of the config panel {@link ConfigPanelComponent}
 */
@Component({
  selector: 'qad-config-panel-toggle',
  templateUrl: './config-panel-toggle.component.html',
  styleUrls: ['./config-panel-toggle.component.scss']
})
export class ConfigPanelToggleComponent implements OnInit {

  @Output() openConfig = new EventEmitter();

  icSettings: Icon = icSettings;

  constructor() { }

  ngOnInit() {
  }

}
