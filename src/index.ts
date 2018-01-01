export * from 'e2e4';

export * from './misc/misc.module';
export * from './filters/filters.module';
export * from './selection/selection.module';
export * from './lists/lists.module';

import { RTFiltersModule } from './filters/filters.module';
import { RTListsModule } from './lists/lists.module';
import { RTMiscModule } from './misc/misc.module';
import { RTSelectionModule } from './selection/selection.module';

import { NgModule } from '@angular/core';

@NgModule({
    exports: [RTListsModule, RTSelectionModule, RTMiscModule, RTFiltersModule],
    imports: [RTListsModule, RTSelectionModule, RTMiscModule, RTFiltersModule]
})
export class RTModule {
    public static registerStateService({
        useClass,
        useValue,
        useExisting,
        useFactory,
        deps,
        multi
    }: {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: () => any;
        deps?: object[];
        multi?: boolean;
    }): void {
        RTListsModule.registerStateService({ useClass, useValue, useExisting, useFactory, deps, multi });
    }
}
