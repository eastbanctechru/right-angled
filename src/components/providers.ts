import { Injectable, provide } from '@angular/core';
import { BufferedPager, FiltersService, PagedPager, RegularPager, SortingsService } from 'e2e4';

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

import { AsyncSubscriber } from './list-directives/async-subscriber';
import { RtListService } from './list-directives/list-service';
import { RtLocalStoragePersistenceService } from './list-directives/local-storage-persistence-service';
import { RtQueryStringStateService } from './list-directives/query-string-state-service';
import { RtSessionStoragePersistenceService } from './list-directives/session-storage-persistence-service';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    provide(BufferedPager, { useValue: null }),
    provide(RegularPager, { useValue: null }),
    provide(PagedPager, { useClass: RtPagedPager }),
    provide(FiltersService, { useClass: RtFiltersService }),
    provide(SortingsService, { useClass: RtSortingsService }),
    RtQueryStringStateService,
    RtLocalStoragePersistenceService,
    RtSessionStoragePersistenceService
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
    RtLocalStoragePersistenceService,
    RtSessionStoragePersistenceService
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
    RtLocalStoragePersistenceService,
    RtSessionStoragePersistenceService
];
