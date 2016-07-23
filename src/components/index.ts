export * from 'e2e4';

export { MISC_DIRECTIVES } from './misc-directives/index';

export { RtListService } from './services/rt-list-service.service';
export { RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService } from './services/injectables';

export { SELECTION_DIRECTIVES } from './selection-directives/index';
import { SELECTION_DIRECTIVES } from './selection-directives/index';
import { LIST_DIRECTIVES } from './list-directives/index';

export { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES, REGULAR_FOOTER_DIRECTIVES } from './list-directives/index';
import { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES, REGULAR_FOOTER_DIRECTIVES } from './list-directives/index';

export { LIST_DIRECTIVES } from './list-directives/index';
export var PAGED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(PAGED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var BUFFERED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(BUFFERED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var REGULAR_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(REGULAR_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));

import { RtQueryStringStateService } from './services/rt-query-string-state-service';
import { RtListService } from './services/rt-list-service.service';

import { RtNullObjectInjectableObject, RtListLifetimeInfo, RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService } from './services/injectables';
import { AsyncSubscriber } from './services/async-subscriber';
import { provide } from '@angular/core';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListLifetimeInfo,
    RtListService,
    provide(RtBufferedPager, { useValue: RtNullObjectInjectableObject.instance }),
    provide(RtRegularPager, { useValue: RtNullObjectInjectableObject.instance }),
    RtSortingsService,
    RtPagedPager,
    RtFiltersService,
    RtQueryStringStateService
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListLifetimeInfo,
    RtListService,
    provide(RtPagedPager, { useValue: RtNullObjectInjectableObject.instance }),
    provide(RtRegularPager, { useValue: RtNullObjectInjectableObject.instance }),
    RtFiltersService,
    RtSortingsService,
    RtBufferedPager,
    RtQueryStringStateService
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListLifetimeInfo,
    RtListService,
    provide(RtPagedPager, { useValue: RtNullObjectInjectableObject.instance }),
    provide(RtBufferedPager, { useValue: RtNullObjectInjectableObject.instance }),
    RtFiltersService,
    RtSortingsService,
    RtRegularPager,
    RtQueryStringStateService
];
