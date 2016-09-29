import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from 'e2e4';

export { MISC_DIRECTIVES } from './src/misc-directives/index';
import { MISC_DIRECTIVES } from './src/misc-directives/index';

export { FILTER_DIRECTIVES } from './src/filter-directives/index';
import { FILTER_DIRECTIVES } from './src/filter-directives/index';

export { SELECTION_DIRECTIVES } from './src/selection-directives/index';
export * from './src/core/index';

import { BufferedListComponent, LIST_DIRECTIVES, LIST_STATE_DIRECTIVES, ListComponent, PagedListComponent } from './src/list-directives/index';
import { SELECTION_DIRECTIVES } from './src/selection-directives/index';

export { BUFFERED_PAGER_DIRECTIVES, PAGED_PAGER_DIRECTIVES } from './src/paging-directives/index';
import { BUFFERED_PAGER_DIRECTIVES, PAGED_PAGER_DIRECTIVES } from './src/paging-directives/index';

export { LIST_DIRECTIVES, LIST_STATE_DIRECTIVES } from './src/list-directives/index';
export var PAGED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(LIST_STATE_DIRECTIVES).concat(PAGED_PAGER_DIRECTIVES).concat([PagedListComponent]);
export var BUFFERED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(LIST_STATE_DIRECTIVES).concat(BUFFERED_PAGER_DIRECTIVES).concat([BufferedListComponent]);
export var REGULAR_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(LIST_STATE_DIRECTIVES).concat([ListComponent]);

export { BufferedListComponent, ListComponent, PagedListComponent } from './src/list-directives/index';
export { SelectionAreaForDirective } from './src/selection-directives/index';

import { RtPersistenceService } from './src/core/persistence-service';
import { BUFFERED_LIST_PROVIDERS, PAGED_LIST_PROVIDERS, REGULAR_LIST_PROVIDERS } from './src/providers';


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
    declarations: [LIST_DIRECTIVES, LIST_STATE_DIRECTIVES, PAGED_PAGER_DIRECTIVES, BUFFERED_PAGER_DIRECTIVES, PagedListComponent, BufferedListComponent, ListComponent],
    exports: [LIST_DIRECTIVES, LIST_STATE_DIRECTIVES, PAGED_PAGER_DIRECTIVES, BUFFERED_PAGER_DIRECTIVES, PagedListComponent, BufferedListComponent, ListComponent],
    imports: [CommonModule]
})
export class RTListsModule {
    public static registerPersistenceService({useClass, useValue, useExisting, useFactory, deps, multi}: {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: Function;
        deps?: Object[];
        multi?: boolean;
    }): void {
        REGULAR_LIST_PROVIDERS.push({
            provide: RtPersistenceService,
            useClass,
            useValue,
            useExisting,
            useFactory,
            deps,
            multi
        });
        BUFFERED_LIST_PROVIDERS.push({
            provide: RtPersistenceService,
            useClass,
            useValue,
            useExisting,
            useFactory,
            deps,
            multi
        });
        PAGED_LIST_PROVIDERS.push({
            provide: RtPersistenceService,
            useClass,
            useValue,
            useExisting,
            useFactory,
            deps,
            multi
        });
    }
}

@NgModule({
    exports: [RTListsModule, RTSelectionModule, RTMiscModule, RTFiltersModule],
    imports: [RTListsModule, RTSelectionModule, RTMiscModule, RTFiltersModule]
})
export class RTModule {
    public static registerPersistenceService({useClass, useValue, useExisting, useFactory, deps, multi}: {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: Function;
        deps?: Object[];
        multi?: boolean;
    }): void {
        RTListsModule.registerPersistenceService({ useClass, useValue, useExisting, useFactory, deps, multi });
    }
}
