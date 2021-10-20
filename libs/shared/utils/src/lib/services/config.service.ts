import { Inject, Injectable } from '@angular/core';
import {
  ConfigName,
  Config,
  configs,
  ensure,
  DeepPartial,
  mergeDeep,
  LayoutService,
  EnvironmentInfo,
} from '@qad-nx/shared-utils';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  defaultConfig = ConfigName.apollo;

  configs: Config[] = configs;

  private _configSubject = new BehaviorSubject(
    ensure(this.configs.find(c => c.id === this.defaultConfig))
  );
  config$ = this._configSubject.asObservable();

  private _environmentSubject = new BehaviorSubject(
    this.availableEnvironments[0]
  );
  environment$ = this._environmentSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private layoutService: LayoutService,
    @Inject('availableEnvironments')
    private availableEnvironments: EnvironmentInfo[]
  ) {
    this.config$.subscribe(config => this._updateConfig(config));
  }

  setConfig(config: ConfigName) {
    const settings = this.configs.find(c => c.id === config);

    if (settings) {
      this._configSubject.next(settings);
    }
  }

  setSelectedEnvironment$(env: { name: string; apiUrl: string }) {
    this._environmentSubject.next(env);
  }

  updateConfig(config: DeepPartial<Config>) {
    this._configSubject.next(
      mergeDeep({ ...this._configSubject.getValue() }, config)
    );
  }

  private _updateConfig(config: Config) {
    const body = this.document.body;

    this.configs.forEach(c => {
      if (body.classList.contains(c.id)) {
        body.classList.remove(c.id);
      }
    });

    body.classList.add(config.id);

    config.sidenav.state === 'expanded'
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();

    this.document.body.dir = config.rtl ? 'rtl' : 'ltr';

    // Workaround so charts and other externals know they have to resize on Layout switch
    if (window) {
      window.dispatchEvent(new Event('resize'));

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200);
    }
  }
}
