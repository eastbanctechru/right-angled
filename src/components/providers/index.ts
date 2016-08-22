export { RtListService } from './list-service';
export { RtQueryStringStateService } from './query-string-state-service';
export { RtPersistenceService } from './persistence-service';
export { RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService } from './injectables';
export { RtNullObjectInjectable } from './null-object-injectable';
export { AsyncSubscriber } from './async-subscriber';

import { RtListService } from './list-service';
import { RtQueryStringStateService } from './query-string-state-service';
import { RtPersistenceService } from './persistence-service';
import { RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService } from './injectables';
import { RtNullObjectInjectable } from './null-object-injectable';
import { AsyncSubscriber } from './async-subscriber';
import { provide } from '@angular/core';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    RtListService,
    provide(RtBufferedPager, { useValue: RtNullObjectInjectable.instance }),
    provide(RtRegularPager, { useValue: RtNullObjectInjectable.instance }),
    RtSortingsService,
    RtPagedPager,
    RtFiltersService,
    RtQueryStringStateService,
    RtPersistenceService
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    RtListService,
    provide(RtPagedPager, { useValue: RtNullObjectInjectable.instance }),
    provide(RtRegularPager, { useValue: RtNullObjectInjectable.instance }),
    RtFiltersService,
    RtSortingsService,
    RtBufferedPager,
    RtQueryStringStateService,
    RtPersistenceService
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    RtListService,
    provide(RtPagedPager, { useValue: RtNullObjectInjectable.instance }),
    provide(RtBufferedPager, { useValue: RtNullObjectInjectable.instance }),
    RtFiltersService,
    RtSortingsService,
    RtRegularPager,
    RtQueryStringStateService,
    RtPersistenceService
];
