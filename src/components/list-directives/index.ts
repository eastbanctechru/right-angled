import { ListStateNoDataComponent } from './list-state/list-state-no-data.component';
import { ListStateRequestCanceledComponent } from './list-state/list-state-request-canceled.component';
import { ListStateFailedComponent } from './list-state/list-state-failed.component';
import { ListStateInitialComponent } from './list-state/list-state-initial.component';
import { ListStateInProgressComponent } from './list-state/list-state-progress.component';
import { DisplayPagerComponent } from './list-state/display-pager.component';
import { TotalRecordsTextComponent } from './paging/total-records-text.component';
export var REGULAR_FOOTER_DIRECTIVES: any[] = [
    ListStateNoDataComponent,
    ListStateRequestCanceledComponent,
    ListStateFailedComponent,
    ListStateInitialComponent,
    ListStateInProgressComponent,
    TotalRecordsTextComponent,
    DisplayPagerComponent
];

import { LoadMoreDirective } from './paging/load-more.directive';
import { RowCountDirective } from './paging/row-count.directive';

export var BUFFERED_FOOTER_DIRECTIVES: any[] = [
    ListStateNoDataComponent,
    ListStateRequestCanceledComponent,
    ListStateFailedComponent,
    ListStateInitialComponent,
    ListStateInProgressComponent,
    TotalRecordsTextComponent,
    DisplayPagerComponent,
    LoadMoreDirective,
    RowCountDirective
];

import { GoToFirstPageDirective } from './paging/go-to-first-page.directive';
import { GoToLastPageDirective } from './paging/go-to-last-page.directive';
import { GoToNextPageDirective } from './paging/go-to-next-page.directive';
import { GoToPrevPageDirective } from './paging/go-to-prev-page.directive';
import { PageSizeDirective } from './paging/page-size.directive';
import { PageNumberDirective } from './paging/page-number.directive';

export var PAGED_FOOTER_DIRECTIVES: any[] = [
    ListStateNoDataComponent,
    ListStateRequestCanceledComponent,
    ListStateFailedComponent,
    ListStateInitialComponent,
    ListStateInProgressComponent,
    TotalRecordsTextComponent,
    DisplayPagerComponent,
    GoToFirstPageDirective,
    GoToLastPageDirective,
    GoToNextPageDirective,
    GoToPrevPageDirective,
    PageSizeDirective,
    PageNumberDirective
];

import { ListComponent } from './list.component';
import { LoadDataDirective } from './list-controls/load-data.directive';
import { CancelLoadDirective } from './list-controls/cancel-load.directive';
import { ResetSettingsDirective } from './list-controls/reset-settings.directive';
import { RowNumberComponent } from './list-controls/row-number.component';
import { SortDirective } from './list-controls/sort.directive';

export var LIST_DIRECTIVES: any[] = [
    ListComponent,
    LoadDataDirective,
    CancelLoadDirective,
    ResetSettingsDirective,
    RowNumberComponent,
    SortDirective
];
