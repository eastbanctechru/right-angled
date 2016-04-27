export {NgPagedListService} from './bootstrap/ngPagedListService';
export {NgBufferedListService} from './bootstrap/ngBufferedListService';
export {NgSimpleListService} from './bootstrap/ngSimpleListService';
export {Defaults} from './defaults';

import {ListComponent} from './lists/list.component';
import {LoadControlButtonDirective} from './lists/load-control-button.directive';
import {LoadControlBaseDirective} from './lists/load-control-base.directive';
import {ResetButtonDirective} from './lists/reset-button.directive';
import {RowNumberComponent} from './lists/row-number.component';
import {SortDirective} from './lists/sort.directive';
import {SelectionAreaForDirective} from './selections/selection-area-for.directive';
import {SelectableItemDirective} from './selections/selectable-item.directive';
import {SelectionCheckboxComponent} from './selections/selection-checkbox.component';
import {StatusNoDataComponent} from './footer/status-no-data.component';
import {StatusRequestCanceledComponent} from './footer/status-request-canceled.component';
import {StatusFailedComponent} from './footer/status-failed.component';
import {StatusInitialComponent} from './footer/status-initial.component';
import {StatusProgressComponent} from './footer/status-progress.component';
import {TotalRecordsTextComponent} from './footer/total-records-text.component';

export var FOOTER_DIRECTIVES: any[] = [
    StatusNoDataComponent,
    StatusRequestCanceledComponent,
    StatusFailedComponent,
    StatusInitialComponent,
    StatusProgressComponent,
    TotalRecordsTextComponent];

export var SELECTION_DIRECTIVES: any[] = [
    SelectionAreaForDirective,
    SelectableItemDirective,
    SelectionCheckboxComponent];

export var RECTANGLE_DIRECTIVES: any[] = [
    ListComponent,
    LoadControlButtonDirective,
    ResetButtonDirective,
    RowNumberComponent,
    SortDirective,
    SelectionAreaForDirective,
    SelectableItemDirective,
    SelectionCheckboxComponent,
    StatusNoDataComponent,
    StatusRequestCanceledComponent,
    StatusFailedComponent,
    StatusInitialComponent,
    StatusProgressComponent,
    TotalRecordsTextComponent
];
