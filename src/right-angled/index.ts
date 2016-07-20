export * from 'e2e4';

export { RtPagedListService } from './services/rt-paged-list-service.service';
export { RtBufferedListService } from './services/rt-buffered-list-service.service';
export { RtListService } from './services/rt-list-service.service';
export { RtBufferedPager, RtPagedPager, RtSimplePager, RtSortingsService, RtFiltersService } from './services/injectables';

import { SELECTION_DIRECTIVES } from './selection-directives/index';
import { LIST_DIRECTIVES } from './list-directives/index';
import { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES, REGULAR_FOOTER_DIRECTIVES } from './list-directives/index';

export { LIST_DIRECTIVES } from './list-directives/index';
export var PAGED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(PAGED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var BUFFERED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(BUFFERED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var REGULAR_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(REGULAR_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));

import { RtQueryStringStateService } from './services/rt-query-string-state-service';
import { RtPagedListService } from './services/rt-paged-list-service.service';
import { RtBufferedListService } from './services/rt-buffered-list-service.service';
import { RtListService } from './services/rt-list-service.service';

import { RtBufferedPager, RtPagedPager, RtSimplePager, RtSortingsService, RtFiltersService } from './services/injectables';
export var PAGED_LIST_PROVIDERS: any[] = [
    RtFiltersService,
    RtSortingsService,
    RtPagedPager,
    RtPagedListService,
    RtQueryStringStateService
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    RtFiltersService,
    RtSortingsService,
    RtBufferedPager,
    RtBufferedListService,
    RtQueryStringStateService
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    RtFiltersService,
    RtSortingsService,
    RtSimplePager,
    RtListService,
    RtQueryStringStateService
];
