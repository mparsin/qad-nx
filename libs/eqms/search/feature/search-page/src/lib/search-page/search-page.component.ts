import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { AppState } from '@qad-nx/eqms-feature-shell';
import {
  isLoadedSelector,
  isLoadingSelector,
  SearchCriteria,
  SearchResult,
  searchResultSelector,
} from '@qad-nx/eqms/search/data-access';
import { fadeInRight400ms, scaleIn400ms } from '@qad-nx/shared-animations';
import { ColDef, GridReadyEvent, IDatasource } from 'ag-grid-community';
import { SearchApiService } from 'libs/eqms/search/data-access/src/lib/http/search-api.service';
import { stagger40ms } from 'libs/shared/animations/src/lib/stagger.animation';
import { appIcons } from 'libs/shared/utils/src/lib/icons/app.icons';
import { DateTime } from 'luxon';
import { map, Observable, shareReplay, tap } from 'rxjs';

export interface LooseObject {
  [key: string]: any;
}

@UntilDestroy()
@Component({
  selector: 'qad-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class SearchPageComponent implements OnInit {
  title = '';
  isLoading$ = this.store.pipe(select(isLoadingSelector));
  isLoaded$ = this.store.pipe(select(isLoadedSelector));
  searchResult$ = this.store.pipe(select(searchResultSelector));
  icons = appIcons;
  menuOpen = false;
  isPaging = false;
  searchCtrl = new FormControl();

  columnTypes = {
    Integer: {
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
    },
    Numeric: {
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
    },
    DateTime: {
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      valueFormatter: this.dateFormatter,
    },
    AutoNumber: {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    String: {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    Reference: {},
    FieldBackcolor: {
      hide: true,
    },
    MultiReference: {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
  };

  // columnDefs$ = this.store.select(columnsSelector).pipe(
  //   map(columns => {
  //     return columns?.map(col => ({
  //       field: col.systemName,
  //       headerName: col.header,
  //       type: col.columnType,
  //     }));
  //   }),
  //   tap(val => console.log('columns', val))
  // );

  columnDefs: ColDef[] = [];

  defaultColDef = {
    resizable: true,
    editable: false,
    autoSizeColumn: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
  };

  // rowData$ = this.store.select(searchResultSelector).pipe(
  //   map(res => {
  //     return res?.items.map(row => {
  //       const obj: LooseObject = {};
  //       let i = 0;
  //       res?.appliedLayout.columns.map(col => {
  //         obj[col.systemName] = row.values[i++];
  //       });
  //       return obj;
  //     });
  //   }),
  //   tap(val => console.log('transformed', val))
  // );
  private systemName: string = '';
  datasource: IDatasource = {
    getRows: ({ startRow, endRow, successCallback, failCallback }) => {
      console.log('startRow', startRow);
      console.log('endRow', endRow);
      const pageNumber = startRow / 25;
      const searchCriteria: SearchCriteria = {
        processSystemName: this.systemName,
        includeLayoutMetadata: true,
        includeProcessMetadata: true,
        pageSize: 25,
        pageNumber: pageNumber,
      };
      this.transformSearchResult(
        this.searchApiService.loadProcessRecords(
          this.systemName,
          searchCriteria,
          pageNumber
        )
      ).subscribe(val => {
        successCallback(val.items, val.rowCount),
          console.log('success callback', val);
      });
    },
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private searchApiService: SearchApiService
  ) {
    route.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.title = params['systemName'];
      this.systemName = params['systemName'];
    });
  }

  ngOnInit(): void {
    // this.searchResult$ = this.transformSearchResult(
    //   this.route.data.pipe(map(data => data.search))
    // );
  }

  onGridReady(params: GridReadyEvent) {
    // params.api.sizeColumnsToFit();
    params.api.setDatasource(this.datasource);
  }

  openMenu() {
    this.menuOpen = true;
  }

  pagingChanged(isPaging: boolean) {
    this.isPaging = isPaging;
    console.log('paging changed', this.isPaging);
  }

  private dateFormatter(params: any) {
    const dateAsString = params.value;
    const date = DateTime.fromISO(dateAsString);
    return date.toISODate({ format: 'extended' });
  }

  private transformSearchResult(result$: Observable<SearchResult>) {
    return result$.pipe(
      shareReplay(),
      untilDestroyed(this),
      map(res => {
        return {
          items: res?.items.map(row => {
            const obj: LooseObject = {};
            let i = 0;
            res?.appliedLayout.columns.map(col => {
              obj[col.systemName] = row.values[i++];
            });
            return obj;
          }),
          rowCount: res.totalRowCount,
          columns: res.appliedLayout.columns?.map(col => ({
            field: col.systemName,
            headerName: col.header,
            type: col.columnType,
          })),
        };
      }),
      tap(val => console.log('transformed', val)),
      tap(val => (this.columnDefs = val.columns))
    );
  }
}
