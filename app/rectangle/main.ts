export {NgPagedListService} from './bootstrap/ngPagedListService';
export {NgBufferedListService} from './bootstrap/ngBufferedListService';
export {NgSimpleListService} from './bootstrap/ngSimpleListService';
export {Defaults} from './defaults';

import {RtStatusNoData} from './footer/status-no-data';
import {RtStatusRequestCanceled} from './footer/status-request-canceled';
import {RtStatusFailed} from './footer/status-failed';
import {RtStatusInitial} from './footer/status-initial';
import {RtStatusProgress} from './footer/status-progress';
import {RtTotalRecordsText} from './footer/total-records-text';
import {RtDisplayPager} from './footer/display-pager';
import {RtLoadMore} from './footer/buffered-controls/load-more';
import {RtTakeRowCount} from './footer/buffered-controls/row-count';


import {RtToFirstPage} from './footer/paged-controls/to-first-page';
import {RtToLastPage} from './footer/paged-controls/to-last-page';
import {RtToNextPage} from './footer/paged-controls/to-next-page';
import {RtToPrevPage} from './footer/paged-controls/to-prev-page';
import {RtPageSize} from './footer/paged-controls/page-size';
import {RtPageNumber} from './footer/paged-controls/page-number';


export var FOOTER_DIRECTIVES: any[] = [
    RtStatusNoData,
    RtStatusRequestCanceled,
    RtStatusFailed,
    RtStatusInitial,
    RtStatusProgress,
    RtTotalRecordsText,
    RtDisplayPager,
    RtLoadMore,
    RtTakeRowCount,
    RtToFirstPage,
    RtToLastPage,
    RtToNextPage,
    RtToPrevPage,
    RtPageSize,
    RtPageNumber
];

import {RtSelectionAreaFor} from './selections/selection-area-for';
import {RtSelectByIndex} from './selections/select-by-index';
import {RtSelectionCheckbox} from './selections/selection-checkbox';


export var SELECTION_DIRECTIVES: any[] = [
    RtSelectionAreaFor,
    RtSelectByIndex,
    RtSelectionCheckbox];



import {RtList} from './lists/list';
import {RtLoadControlButton} from './lists/load-control-button';
import {RtLoadControlBase} from './lists/load-control-base';
import {RtResetButton} from './lists/reset-button';
import {RtRowNumber} from './lists/row-number';
import {RtSort} from './lists/sort';

export var RECTANGLE_DIRECTIVES: any[] = [
    RtList,
    RtLoadControlButton,
    RtResetButton,
    RtRowNumber,
    RtSort,
    RtSelectionAreaFor,
    RtSelectByIndex,
    RtSelectionCheckbox,
    RtStatusNoData,
    RtStatusRequestCanceled,
    RtStatusFailed,
    RtStatusInitial,
    RtStatusProgress,
    RtTotalRecordsText,
    RtDisplayPager,
    RtLoadMore,
    RtTakeRowCount,
    RtToFirstPage,
    RtToLastPage,
    RtToNextPage,
    RtToPrevPage,
    RtPageSize,
    RtPageNumber
];
