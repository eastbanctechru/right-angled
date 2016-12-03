// tslint:disable:max-classes-per-file
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from 'e2e4';

import { FocusOnRenderDirective, PreventDefaultsDirective, SelectOnFocusDirective, StopEventsDirective } from './src/misc-directives';

import { RegisterAsFilterDirective } from './src/filter-directives';

export * from './src/core/index';

import {
    StatusDoneComponent,
    StatusFailedComponent,
    StatusInitialComponent,
    StatusInProgressComponent,
    StatusNoDataComponent,
    StatusRequestCancelledComponent
} from './src/status-components';

import {
    ListDirective,
    RowNumberPipe,
    SortDirective
} from './src/list-directives';

import {
    SelectableDirective,
    SelectionAreaDirective,
    SelectionCheckboxForDirective
} from './src/selection-directives';

import {
    BufferedPagerComponent,
    PagedPagerComponent,
    PageNumberDirective,
    PageSizeDirective,
    RowCountDirective
} from './src/paging-directives';

export { SortDirective } from './src/list-directives/sort.directive';
export { ListDirective } from './src/list-directives';
export { SelectionAreaDirective } from './src/selection-directives';
export { SelectableDirective } from './src/selection-directives';

import { LIST_PROVIDERS, RtStateService } from './src/core';

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
            provide: RtStateService,
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
