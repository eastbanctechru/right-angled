import { PagedPager, BufferedPager, RegularPager, SortingsService, FiltersService } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
class RtPagedPager extends PagedPager { }

@Injectable()
class RtBufferedPager extends BufferedPager { }

@Injectable()
class RtRegularPager extends RegularPager { }

@Injectable()
class RtSortingsService extends SortingsService { }

@Injectable()
class RtFiltersService extends FiltersService { }

import { RtListService } from './list-directives/list-service';
import { RtQueryStringStateService } from './list-directives/query-string-state-service';
import { RtPersistenceService } from './list-directives/persistence-service';
import { AsyncSubscriber } from './list-directives/async-subscriber';
import { provide } from '@angular/core';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    provide(BufferedPager, { useValue: null }),
    provide(RegularPager, { useValue: null }),
    provide(PagedPager, { useClass: RtPagedPager }),
    provide(FiltersService, { useClass: RtFiltersService }),
    provide(SortingsService, { useClass: RtSortingsService }),
    RtQueryStringStateService,
    RtPersistenceService
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    provide(PagedPager, { useValue: null }),
    provide(RegularPager, { useValue: null }),
    provide(BufferedPager, { useClass: RtBufferedPager }),
    provide(FiltersService, { useClass: RtFiltersService }),
    provide(SortingsService, { useClass: RtSortingsService }),
    RtQueryStringStateService,
    RtPersistenceService
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    provide(PagedPager, { useValue: null }),
    provide(BufferedPager, { useValue: null }),
    provide(RegularPager, { useClass: RtRegularPager }),
    provide(FiltersService, { useClass: RtFiltersService }),
    provide(SortingsService, { useClass: RtSortingsService }),
    RtQueryStringStateService,
    RtPersistenceService
];
