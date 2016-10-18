import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from 'e2e4';

import { FocusOnRenderDirective, PreventDefaultsDirective, SelectOnFocusDirective, StopEventsDirective } from './src/misc-directives/index';

import { RegisterAsFilterDirective } from './src/filter-directives/index';

export * from './src/core/index';

import {
    ListDirective,
    ListStateDoneComponent,
    ListStateFailedComponent,
    ListStateInProgressComponent,
    ListStateInitialComponent,
    ListStateNoDataComponent,
    ListStateRequestCanceledComponent,
    RowNumberPipe,
    SortDirective
} from './src/list-directives/index';

import {
    CheckAllDirective,
    DeselectAllDirective,
    SelectAllDirective,
    SelectableDirective,
    SelectionAreaDirective,
    SelectionCheckboxForDirective
} from './src/selection-directives/index';

import {
    BufferedPagerComponent,
    GoToFirstPageDirective,
    GoToLastPageDirective,
    GoToNextPageDirective,
    GoToPreviousPageDirective,
    LoadMoreDirective,
    PageNumberDirective,
    PageSizeDirective,
    PagedPagerComponent,
    RowCountDirective
} from './src/paging-directives/index';

export { ListDirective } from './src/list-directives/index';
export { SelectionAreaDirective } from './src/selection-directives/index';

import { RtStateService } from './src/core/state-service';
import { LIST_PROVIDERS } from './src/providers';

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
        SelectionCheckboxForDirective,
        SelectAllDirective,
        DeselectAllDirective,
        CheckAllDirective],
    exports: [
        SelectableDirective,
        SelectionAreaDirective,
        SelectionCheckboxForDirective,
        SelectAllDirective,
        DeselectAllDirective,
        CheckAllDirective],
    imports: [CommonModule]
})
export class RTSelectionModule { }

@NgModule({
    declarations: [
        ListDirective,
        ListStateNoDataComponent,
        ListStateRequestCanceledComponent,
        ListStateDoneComponent,
        ListStateFailedComponent,
        ListStateInitialComponent,
        ListStateInProgressComponent,
        RowNumberPipe,
        SortDirective, PagedPagerComponent,
        GoToFirstPageDirective,
        GoToLastPageDirective,
        GoToNextPageDirective,
        GoToPreviousPageDirective,
        PageSizeDirective,
        PageNumberDirective,
        BufferedPagerComponent,
        LoadMoreDirective,
        RowCountDirective],
    exports: [
        ListDirective,
        ListStateNoDataComponent,
        ListStateRequestCanceledComponent,
        ListStateDoneComponent,
        ListStateFailedComponent,
        ListStateInitialComponent,
        ListStateInProgressComponent,
        RowNumberPipe,
        SortDirective,
        PagedPagerComponent,
        GoToFirstPageDirective,
        GoToLastPageDirective,
        GoToNextPageDirective,
        GoToPreviousPageDirective,
        PageSizeDirective,
        PageNumberDirective,
        BufferedPagerComponent,
        LoadMoreDirective,
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
