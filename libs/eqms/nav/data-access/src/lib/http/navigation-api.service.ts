import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NavigationDropdown,
  NavigationItem,
  NavigationLink,
} from '@qad-nx/shared-utils';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationApiService {
  private baseUrl = 'http://localhost:55540/api'; //TODO: user environment

  constructor(private httpClient: HttpClient) {}

  loadNavigationProcesses(
    search: string = ''
  ): Observable<Array<NavigationDropdown>> {
    return this.httpClient
      .get(this.baseUrl + `/navigation?filter=${search}`)
      .pipe(
        map(
          (
            items: any //TODO: add type
          ) =>
            items.map((ng: any) => ({
              //TODO: add type
              label: ng.name,
              id: ng.id,
              route: '',
              type: 'dropdown',
              icon: ng.icon_fa === '' ? 'description' : ng.icon_fa,
              children: ng.navigationItems?.map((ni: any) => ({
                //TODO: add type
                label: ni.name,
                id: ni.id,
                type: 'link',
                route: `process/${ni.systemName}`,
                color: ni.processColor ?? '#FFF',
                isFavorite: ni.isFavorite,
                documentation: ni.documentation,
                icon: ni.iconName === '' ? 'description' : ni.iconName,
              })),
            }))
        ),
        shareReplay()
      );
  }
}
