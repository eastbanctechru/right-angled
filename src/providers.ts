import { Injectable } from '@angular/core';
import { BufferedPager, FiltersService, NullObjectPager, PagedPager, SortingsService } from 'e2e4';

@Injectable()
class RtPagedPager extends PagedPager { }

@Injectable()
class RtBufferedPager extends BufferedPager { }

@Injectable()
class RtNullObjectPager extends NullObjectPager { }

@Injectable()
class RtSortingsService extends SortingsService { }

@Injectable()
class RtFiltersService extends FiltersService { }

import { AsyncSubscriber } from './core/async-subscriber';
import { RtListService } from './core/list-service';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: BufferedPager, useValue: null },
    { provide: NullObjectPager, useValue: null },
    { provide: PagedPager, useClass: RtPagedPager },
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: BufferedPager, useClass: RtBufferedPager },
    { provide: NullObjectPager, useValue: null },
    { provide: PagedPager, useValue: null },
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: BufferedPager, useValue: null },
    { provide: NullObjectPager, useClass: RtNullObjectPager },
    { provide: PagedPager, useValue: null },
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];
