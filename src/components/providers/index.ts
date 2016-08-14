export { RtListService } from './list-service';
export { RtQueryStringStateService } from './query-string-state-service';
export { RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService } from './injectables';
export { RtNullObjectInjectable } from './null-object-injectable';
export { AsyncSubscriber } from './async-subscriber';
export { SelectionEventsEmitter, OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent } from './selection-events-emitter';
export { RtSelectionService } from './selection-service';

import { RtListService } from './list-service';
import { RtQueryStringStateService } from './query-string-state-service';
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
    RtQueryStringStateService
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
    RtQueryStringStateService
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
    RtQueryStringStateService
];
