import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchCriteria, SearchResult } from '@qad-nx/eqms/search/data-access';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchApiService {
  private baseUrl = 'http://localhost:55540/api'; //TODO: user environment

  constructor(private httpClient: HttpClient) {}

  loadProcessRecords(
    processSystemName: string,
    payload?: SearchCriteria,
    pageIndex: number = 0
  ): Observable<SearchResult> {
    return this.httpClient
      .post(
        `${this.baseUrl}/process/${processSystemName}/page/${pageIndex}`,
        payload
      )
      .pipe() as Observable<SearchResult>;
  }
}
