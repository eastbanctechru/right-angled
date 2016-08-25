import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from 'e2e4';

export { MISC_DIRECTIVES } from './misc-directives/index';
import { MISC_DIRECTIVES } from './misc-directives/index';

export { FILTER_DIRECTIVES } from './filter-directives/index';
import { FILTER_DIRECTIVES } from './filter-directives/index';

export { SELECTION_DIRECTIVES } from './selection-directives/index';
export { RtSelectionService, OnDeselected, OnDeselectedEvent, OnSelected, OnSelectedEvent, OnSelectionChanged, OnSelectionChangedEvent, SelectionEventsEmitter } from './selection-directives/index';

import { BufferedListComponent, LIST_DIRECTIVES, LIST_STATE_DIRECTIVES, ListComponent, PagedListComponent } from './list-directives/index';
import { SELECTION_DIRECTIVES } from './selection-directives/index';

export { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES } from './list-directives/index';
import { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES } from './list-directives/index';

export { LIST_DIRECTIVES, LIST_STATE_DIRECTIVES } from './list-directives/index';
export var PAGED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(LIST_STATE_DIRECTIVES).concat(PAGED_FOOTER_DIRECTIVES).concat([PagedListComponent]);
export var BUFFERED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(LIST_STATE_DIRECTIVES).concat(BUFFERED_FOOTER_DIRECTIVES).concat([BufferedListComponent]);
export var REGULAR_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(LIST_STATE_DIRECTIVES).concat([ListComponent]);

@NgModule({
    declarations: MISC_DIRECTIVES,
    exports: MISC_DIRECTIVES,
    imports: [CommonModule]
})
export class RTMiscModule { }

@NgModule({
    declarations: FILTER_DIRECTIVES,
    exports: FILTER_DIRECTIVES,
    imports: [CommonModule]
})
export class RTFiltersModule { }

@NgModule({
    declarations: SELECTION_DIRECTIVES,
    exports: SELECTION_DIRECTIVES,
    imports: [CommonModule]
})
export class RTSelectionModule { }

@NgModule({
    declarations: [PAGED_LIST_DIRECTIVES, BUFFERED_LIST_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    exports: [PAGED_LIST_DIRECTIVES, BUFFERED_LIST_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    imports: [CommonModule]
})
export class RTListModule { }

export { RtLocalStoragePersistenceService } from './list-directives/local-storage-persistence-service';
export { RtQueryStringStateService } from './list-directives/query-string-state-service';
export { RtSessionStoragePersistenceService } from './list-directives/session-storage-persistence-service';
export { registerPersistenceService } from './providers';
