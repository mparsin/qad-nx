import { EntityState } from '@ngrx/entity';
import { SearchResult } from 'libs/eqms/search/data-access/src/lib/http/search.model';

export interface SearchStateInterface {
  loading: boolean;
  loaded: boolean;
  searchResult?: SearchResult;
}
