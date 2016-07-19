import { PagedPager, BufferedPager, SimplePager, SortingsService, FiltersService } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
export class RtPagedPager extends PagedPager { }
@Injectable()
export class RtBufferedPager extends BufferedPager { }
@Injectable()
export class RtSimplePager extends SimplePager { }
@Injectable()
export class RtSortingsService extends SortingsService { }
@Injectable()
export class RtFiltersService extends FiltersService { }
