/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListDirective } from './list.directive';
import { StatusDoneComponent } from './status/status-done.component';
import { StatusFailedComponent } from './status/status-failed.component';
import { StatusInProgressComponent } from './status/status-in-progress.component';
import { StatusInitialComponent } from './status/status-initial.component';
import { StatusNoDataComponent } from './status/status-no-data.component';
import { StatusRequestCancelledComponent } from './status/status-request-cancelled.component';
import { RowNumberPipe } from './row-number.pipe';
import { SortDirective } from './sort.directive';
import { BufferedPagerComponent } from './paging/buffered-pager.component';
import { InfiniteDirective } from './paging/infinite.directive';
import { PageNumberDirective } from './paging/page-number.directive';
import { PageSizeDirective } from './paging/page-size.directive';
import { PagedPagerComponent } from './paging/paged-pager.component';
import { RowCountDirective } from './paging/row-count.directive';
import { LIST_PROVIDERS, RTStateService } from './providers/list';
var RTListsModule = /** @class */ (function () {
    function RTListsModule() {
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    RTListsModule.registerStateService = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        LIST_PROVIDERS.push({
            deps: deps,
            multi: multi,
            provide: RTStateService,
            useClass: useClass,
            useExisting: useExisting,
            useFactory: useFactory,
            useValue: useValue
        });
    };
    RTListsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
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
                        InfiniteDirective,
                        RowCountDirective
                    ],
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
                        InfiniteDirective,
                        RowCountDirective
                    ],
                    imports: [CommonModule]
                },] },
    ];
    return RTListsModule;
}());
export { RTListsModule };
export { RTList, RTBufferedPager, RTPagedPager, RTOperationStatus, RTSortingsService, RTFilterTarget } from './providers/list';
export { ListDirective } from './list.directive';
export { StatusNoDataComponent } from './status/status-no-data.component';
export { StatusRequestCancelledComponent } from './status/status-request-cancelled.component';
export { StatusDoneComponent } from './status/status-done.component';
export { StatusFailedComponent } from './status/status-failed.component';
export { StatusInitialComponent } from './status/status-initial.component';
export { StatusInProgressComponent } from './status/status-in-progress.component';
export { RowNumberPipe } from './row-number.pipe';
export { SortDirective } from './sort.directive';
export { PagedPagerComponent } from './paging/paged-pager.component';
export { PageSizeDirective } from './paging/page-size.directive';
export { PageNumberDirective } from './paging/page-number.directive';
export { BufferedPagerComponent } from './paging/buffered-pager.component';
export { InfiniteDirective } from './paging/infinite.directive';
export { RowCountDirective } from './paging/row-count.directive';
export { LIST_PROVIDERS, RTStateService } from './providers/list';
