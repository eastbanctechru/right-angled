import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from 'e2e4';

export { MISC_DIRECTIVES } from './src/misc-directives/index';
import { MISC_DIRECTIVES } from './src/misc-directives/index';

export { FILTER_DIRECTIVES } from './src/filter-directives/index';
import { FILTER_DIRECTIVES } from './src/filter-directives/index';

export { SELECTION_DIRECTIVES } from './src/selection-directives/index';
export * from './src/core/index';

import { LIST_DIRECTIVES } from './src/list-directives/index';
import { SELECTION_DIRECTIVES } from './src/selection-directives/index';

import { BUFFERED_PAGER_DIRECTIVES, PAGED_PAGER_DIRECTIVES } from './src/paging-directives/index';

export { ListComponent } from './src/list-directives/index';
export { SelectionAreaForDirective } from './src/selection-directives/index';

import { RtPersistenceService } from './src/core/persistence-service';
import { LIST_PROVIDERS } from './src/providers';

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
    declarations: [LIST_DIRECTIVES, PAGED_PAGER_DIRECTIVES, BUFFERED_PAGER_DIRECTIVES],
    exports: [LIST_DIRECTIVES, PAGED_PAGER_DIRECTIVES, BUFFERED_PAGER_DIRECTIVES],
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
        LIST_PROVIDERS.push({
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
