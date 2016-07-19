import { PagedPager, BufferedPager, SimplePager, SortingsService, FiltersService } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
export class NgPagedPager extends PagedPager { }
@Injectable()
export class NgBufferedPager extends BufferedPager { }
@Injectable()
export class NgSimplePager extends SimplePager { }
@Injectable()
export class NgSortingsService extends SortingsService { }
@Injectable()
export class NgFiltersService extends FiltersService { }
