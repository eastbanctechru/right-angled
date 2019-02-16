import { NgModule } from '@angular/core';

import { RTFiltersModule } from './filters/filters.module';
import { RTListsModule } from './lists/lists.module';
import { RTMiscModule } from './misc/misc.module';
import { RTSelectionModule } from './selection/selection.module';

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
        RTListsModule.registerStateService({
            useClass,
            useValue,
            useExisting,
            useFactory,
            deps,
            multi
        });
    }
}
