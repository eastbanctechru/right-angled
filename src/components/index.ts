export * from 'e2e4';

export { MISC_DIRECTIVES } from './misc-directives/index';

export { RtListService, RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService, RtQueryStringStateService } from './services/index';

export { SELECTION_DIRECTIVES } from './selection-directives/index';
import { SELECTION_DIRECTIVES } from './selection-directives/index';
import { LIST_DIRECTIVES } from './list-directives/index';

export { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES, REGULAR_FOOTER_DIRECTIVES } from './list-directives/index';
import { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES, REGULAR_FOOTER_DIRECTIVES } from './list-directives/index';

export { LIST_DIRECTIVES } from './list-directives/index';
export var PAGED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(PAGED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var BUFFERED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(BUFFERED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var REGULAR_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(REGULAR_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));

import { AsyncSubscriber, RtNullObjectInjectable, RtListService, RtQueryStringStateService, RtLifetimeInfo, RtBufferedPager, RtPagedPager, RtRegularPager, RtSortingsService, RtFiltersService } from './services/index';
import { provide } from '@angular/core';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtLifetimeInfo,
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
    RtLifetimeInfo,
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
    RtLifetimeInfo,
    RtListService,
    provide(RtPagedPager, { useValue: RtNullObjectInjectable.instance }),
    provide(RtBufferedPager, { useValue: RtNullObjectInjectable.instance }),
    RtFiltersService,
    RtSortingsService,
    RtRegularPager,
    RtQueryStringStateService
];
