export { NgPagedListService } from './bootstrap/ng-paged-list-service.service';
export { NgBufferedListService } from './bootstrap/ng-buffered-list-service.service';
export { NgListService } from './bootstrap/ng-list-service.service';
export { Defaults } from './defaults';
export * from 'e2e4';

import { RtStatusNoDataComponent } from './footer-components/status-no-data.component';
import { RtStatusRequestCanceledComponent } from './footer-components/status-request-canceled.component';
import { RtStatusFailedComponent } from './footer-components/status-failed.component';
import { RtStatusInitialComponent } from './footer-components/status-initial.component';
import { RtStatusProgressComponent } from './footer-components/status-progress.component';
import { RtTotalRecordsTextComponent } from './footer-components/total-records-text.component';
import { RtDisplayPagerComponent } from './footer-components/display-pager.component';
import { RtLoadMoreDirective } from './buffered-directives/load-more.directive';
import { RtRowCountDirective } from './buffered-directives/row-count.directive';

import { RtToFirstPageDirective } from './paged-directives/to-first-page.directive';
import { RtToLastPageDirective } from './paged-directives/to-last-page.directive';
import { RtToNextPageDirective } from './paged-directives/to-next-page.directive';
import { RtToPrevPageDirective } from './paged-directives/to-prev-page.directive';
import { RtPageSizeDirective } from './paged-directives/page-size.directive';
import { RtPageNumberDirective } from './paged-directives/page-number.directive';

export var FOOTER_DIRECTIVES: any[] = [
    RtStatusNoDataComponent,
    RtStatusRequestCanceledComponent,
    RtStatusFailedComponent,
    RtStatusInitialComponent,
    RtStatusProgressComponent,
    RtTotalRecordsTextComponent,
    RtDisplayPagerComponent,
    RtLoadMoreDirective,
    RtRowCountDirective,
    RtToFirstPageDirective,
    RtToLastPageDirective,
    RtToNextPageDirective,
    RtToPrevPageDirective,
    RtPageSizeDirective,
    RtPageNumberDirective
];

import { RtSelectionAreaForDirective } from './selection-directives/selection-area-for.directive';
import { RtSelectByIndexDirective } from './selection-directives/select-by-index.directive';
import { RtSelectionCheckboxForDirective } from './selection-directives/selection-checkbox-for.directive';
import { RtSelectAllDirective } from './selection-directives/select-all.directive';
import { RtDeselectAllDirective } from './selection-directives/deselect-all.directive';
import { RtCheckAllDirective } from './selection-directives/check-all.directive';

export var SELECTION_DIRECTIVES: any[] = [
    RtSelectionAreaForDirective,
    RtSelectByIndexDirective,
    RtSelectionCheckboxForDirective,
    RtSelectAllDirective,
    RtDeselectAllDirective,
    RtCheckAllDirective];

import { RtListComponent } from './list-components/list.component';
import { RtLoadControlButtonDirective } from './list-components/load-control-button.directive';
import { RtResetButtonDirective } from './list-components/reset-button.directive';
import { RtRowNumberComponent } from './list-components/row-number.component';
import { RtSortDirective } from './list-components/sort.directive';

export var RIGHTANGLED_DIRECTIVES: any[] = [
    RtListComponent,
    RtLoadControlButtonDirective,
    RtResetButtonDirective,
    RtRowNumberComponent,
    RtSortDirective
].concat(SELECTION_DIRECTIVES, FOOTER_DIRECTIVES);

import { NgQueryStringStateManager } from './bootstrap/ng-query-string-state-manager';
export var RIGHTANGLED_PROVIDERS: any[] = [
    NgQueryStringStateManager
];
