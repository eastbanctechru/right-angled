export { NgPagedListService } from './bootstrap/ngPagedListService';
export { NgBufferedListService } from './bootstrap/ngBufferedListService';
export { NgListService } from './bootstrap/ngListService';
export { Defaults } from './defaults';
export * from 'e2e4';

import { RtStatusNoDataComponent } from './footer/status-no-data';
import { RtStatusRequestCanceledComponent } from './footer/status-request-canceled';
import { RtStatusFailedComponent } from './footer/status-failed';
import { RtStatusInitialComponent } from './footer/status-initial';
import { RtStatusProgressComponent } from './footer/status-progress';
import { RtTotalRecordsTextComponent } from './footer/total-records-text';
import { RtDisplayPagerComponent } from './footer/display-pager';
import { RtLoadMoreDirective } from './footer/buffered-controls/load-more';
import { RtRowCountDirective } from './footer/buffered-controls/row-count';

import { RtToFirstPageDirective } from './footer/paged-controls/to-first-page';
import { RtToLastPageDirective } from './footer/paged-controls/to-last-page';
import { RtToNextPageDirective } from './footer/paged-controls/to-next-page';
import { RtToPrevPageDirective } from './footer/paged-controls/to-prev-page';
import { RtPageSizeDirective } from './footer/paged-controls/page-size';
import { RtPageNumberDirective } from './footer/paged-controls/page-number';

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

import { RtSelectionAreaForDirective } from './selections/selection-area-for.directive';
import { RtSelectByIndexDirective } from './selections/select-by-index.directive';
import { RtSelectionCheckboxForDirective } from './selections/selection-checkbox-for.directive';
import { RtSelectAllDirective } from './selections/select-all.directive';
import { RtDeselectAllDirective } from './selections/deselect-all.directive';
import { RtCheckAllDirective } from './selections/check-all.directive';

export var SELECTION_DIRECTIVES: any[] = [
    RtSelectionAreaForDirective,
    RtSelectByIndexDirective,
    RtSelectionCheckboxForDirective,
    RtSelectAllDirective,
    RtDeselectAllDirective,
    RtCheckAllDirective];

import { RtListComponent } from './lists/list.component';
import { RtLoadControlButtonDirective } from './lists/load-control-button.directive';
import { RtResetButtonDirective } from './lists/reset-button.directive';
import { RtRowNumberComponent } from './lists/row-number.component';
import { RtSortDirective } from './lists/sort.directive';

export var RIGHTANGLED_DIRECTIVES: any[] = [
    RtListComponent,
    RtLoadControlButtonDirective,
    RtResetButtonDirective,
    RtRowNumberComponent,
    RtSortDirective
].concat(SELECTION_DIRECTIVES, FOOTER_DIRECTIVES);

import { QueryStringStateManager } from './bootstrap/queryStringStateManager';
export var RIGHTANGLED_PROVIDERS: any[] = [
    QueryStringStateManager
];
