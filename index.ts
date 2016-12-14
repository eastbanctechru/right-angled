// tslint:disable:max-classes-per-file
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from 'e2e4';

import { FocusOnRenderDirective, PreventDefaultsDirective, SelectOnFocusDirective, StopEventsDirective } from './src/misc-directives/index';

import { RegisterAsFilterDirective } from './src/filter-directives/index';

export * from './src/core/index';

import {
    StatusDoneComponent,
    StatusFailedComponent,
    StatusInitialComponent,
    StatusInProgressComponent,
    StatusNoDataComponent,
    StatusRequestCancelledComponent
} from './src/status-components/index';

import {
    ListDirective,
    RowNumberPipe,
    SortDirective
} from './src/list-directives/index';

import {
    SelectableDirective,
    SelectionAreaDirective,
    SelectionCheckboxForDirective
} from './src/selection-directives/index';

import {
    BufferedPagerComponent,
    PagedPagerComponent,
    PageNumberDirective,
    PageSizeDirective,
    RowCountDirective
} from './src/paging-directives/index';

export { ListDirective, SortDirective } from './src/list-directives/index';
export { SelectableDirective, SelectionAreaDirective } from './src/selection-directives/index';

import { LIST_PROVIDERS, RTStateService } from './src/core/index';

@NgModule({
    declarations: [FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective],
    exports: [FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective],
    imports: [CommonModule]
})
export class RTMiscModule { }

@NgModule({
    declarations: [RegisterAsFilterDirective],
    exports: [RegisterAsFilterDirective],
    imports: [CommonModule]
})
export class RTFiltersModule { }

@NgModule({
    declarations: [
        SelectableDirective,
        SelectionAreaDirective,
        SelectionCheckboxForDirective
    ],
    exports: [
        SelectableDirective,
        SelectionAreaDirective,
        SelectionCheckboxForDirective],
    imports: [CommonModule]
})
export class RTSelectionModule { }

@NgModule({
    declarations: [
        ListDirective,
        StatusNoDataComponent,
        StatusRequestCancelledComponent,
        StatusDoneComponent,
        StatusFailedComponent,
        StatusInitialComponent,
        StatusInProgressComponent,
        RowNumberPipe,
        SortDirective, PagedPagerComponent,
        PageSizeDirective,
        PageNumberDirective,
        BufferedPagerComponent,
        RowCountDirective],
    exports: [
        ListDirective,
        StatusNoDataComponent,
        StatusRequestCancelledComponent,
        StatusDoneComponent,
        StatusFailedComponent,
        StatusInitialComponent,
        StatusInProgressComponent,
        RowNumberPipe,
        SortDirective,
        PagedPagerComponent,
        PageSizeDirective,
        PageNumberDirective,
        BufferedPagerComponent,
        RowCountDirective],
    imports: [CommonModule]
})
export class RTListsModule {
    public static registerStateService({useClass, useValue, useExisting, useFactory, deps, multi}: {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: Function;
        deps?: Object[];
        multi?: boolean;
    }): void {
        LIST_PROVIDERS.push({
            provide: RTStateService,
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
    public static registerStateService({useClass, useValue, useExisting, useFactory, deps, multi}: {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: Function;
        deps?: Object[];
        multi?: boolean;
    }): void {
        RTListsModule.registerStateService({ useClass, useValue, useExisting, useFactory, deps, multi });
    }
}
