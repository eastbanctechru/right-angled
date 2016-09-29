import { Injectable } from '@angular/core';
import { BufferedPager, FiltersService, PagedPager, SortingsService } from 'e2e4';

@Injectable()
export class RtPagedPager extends PagedPager { }

@Injectable()
export class RtBufferedPager extends BufferedPager { }

@Injectable()
export class RtSortingsService extends SortingsService { }

@Injectable()
export class RtFiltersService extends FiltersService { }

import { AsyncSubscriber } from './core/async-subscriber';
import { RtListService } from './core/list-service';

export var LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];
