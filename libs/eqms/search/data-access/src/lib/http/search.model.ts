interface AggregateGroupInfo {
  groupList: object;
  aggregates: Array<any>;
  onlyAggregates: boolean;
  onlyGroup: boolean;
  groupOrder: Array<any>;
}

export interface SearchCriteria {
  processSystemName: string;
  aggregateGroupInfo?: AggregateGroupInfo;
  columnFilter?: string;
  includeLayoutMetadata?: boolean;
  includeProcessMetadata?: boolean;
  includeColumns?: boolean;
  layoutId?: number;
  pageNumber?: number;
  pageSize: number;
  searchText?: string;
  sortFields?: string;
}

export interface MetricsData {
  blockedFields: string;
  items: Array<MetricItem>;
}

export interface MetricItem {
  category: string;
  index: number;
  result: any;
}

export interface LayoutInfo {
  id: number;
  isAdminDefault: boolean;
  isAdminLayout: boolean;
  isDefault: boolean;
  name: string;
}

export interface Filter {
  quickFilter?: boolean;
  name: string;
  guid: string;
  id: number;
  isAdminFilter: boolean;
  filterDefinition: string;
}

export interface Layout {
  columns: Array<Column>;
}

export interface Column {
  cssClasses: string;
  header: string;
  systemName: string;
  columnType: string;
  isVisible: boolean;
}

export interface SearchResultMetadata {
  displayName: string;
}

export interface SearchResult {
  processDisplayName: string;
  systemName: string;
  metricsData: MetricsData;
  totalRowCount: number;
  layouts: Array<LayoutInfo>;
  filters: Array<Filter>;
  appliedLayout: Layout;
  processMetadata: SearchResultMetadata;
  items: Array<any>;
}
