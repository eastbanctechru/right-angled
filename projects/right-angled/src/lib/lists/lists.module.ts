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
})
export class RTListsModule {
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
        LIST_PROVIDERS.push({
            deps,
            multi,
            provide: RTStateService,
            useClass,
            useExisting,
            useFactory,
            useValue
        });
    }
}

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
