/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export { cloneAsLiteral, coerceValue, destroyAll, coerceTypes, OperationStatus, SortDirection, PushBasedSubscriptionProxy, PromiseSubscriptionProxy, AsyncSubscriber, BufferedPager, getDefaultFilterConfig, filter, DefaultFilterConfig, FiltersService, List, PagedPager, KeyCodes, MouseButtons, SelectionEventsHelper, DefaultSelectionService, NullObjectPager, Operation, SortingsService, StateService, StatusTrackingService } from 'e2e4';
export { RTMiscModule, FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective } from './misc/misc.module';
export { RTFiltersModule, RegisterAsFilterDirective, RTFiltersService } from './filters/filters.module';
export { RTSelectionModule, RTSelectionService, RTSelectionEventsHelper, SelectableDirective, SelectionAreaDirective, SelectionCheckboxForDirective } from './selection/selection.module';
export { RTListsModule, RTList, RTBufferedPager, RTPagedPager, RTOperationStatus, RTSortingsService, RTFilterTarget, ListDirective, StatusNoDataComponent, StatusRequestCancelledComponent, StatusDoneComponent, StatusFailedComponent, StatusInitialComponent, StatusInProgressComponent, RowNumberPipe, SortDirective, PagedPagerComponent, PageSizeDirective, PageNumberDirective, BufferedPagerComponent, InfiniteDirective, RowCountDirective, LIST_PROVIDERS, RTStateService } from './lists/lists.module';
import { RTFiltersModule } from './filters/filters.module';
import { RTListsModule } from './lists/lists.module';
import { RTMiscModule } from './misc/misc.module';
import { RTSelectionModule } from './selection/selection.module';
import { NgModule } from '@angular/core';
var RTModule = /** @class */ (function () {
    function RTModule() {
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    RTModule.registerStateService = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        RTListsModule.registerStateService({ useClass: useClass, useValue: useValue, useExisting: useExisting, useFactory: useFactory, deps: deps, multi: multi });
    };
    RTModule.decorators = [
        { type: NgModule, args: [{
                    exports: [RTListsModule, RTSelectionModule, RTMiscModule, RTFiltersModule],
                    imports: [RTListsModule, RTSelectionModule, RTMiscModule, RTFiltersModule]
                },] },
    ];
    return RTModule;
}());
export { RTModule };
