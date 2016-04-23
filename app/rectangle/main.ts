export {NgPagedListService} from './bootstrap/ngPagedListService';
export {NgBufferedListService} from './bootstrap/ngBufferedListService';
export {NgSimpleListService} from './bootstrap/ngSimpleListService';
export {Defaults} from './defaults';

import {ListComponent} from './lists/list.component';
import {LoadButtonDirective} from './lists/load-button.directive';
import {ResetButtonDirective} from './lists/reset-button.directive';
import {RowNumberComponent} from './lists/row-number.component';
import {SortDirective} from './lists/sort.directive';
import {SelectionAreaForDirective} from './selections/selection-area-for.directive';
import {SelectableItemDirective} from './selections/selectable-item.directive';
import {SelectionCheckboxComponent} from './selections/selection-checkbox.component';

import {E2E4Pager} from './pagers/e2e4Pager';
import {E2E4BufferedPager} from './pagers/e2e4BufferedPager';
import {E2E4SimplePager} from './pagers/e2e4SimplePager';
import {E2E4PagedPager} from './pagers/e2e4PagedPager';


export var E2E4_DIRECTIVES: any[] = [
    ListComponent,
    LoadButtonDirective,
    ResetButtonDirective,
    RowNumberComponent,
    SortDirective,
    SelectionAreaForDirective,
    SelectableItemDirective,
    SelectionCheckboxComponent,
    E2E4Pager,
    E2E4BufferedPager,
    E2E4SimplePager,
    E2E4PagedPager
];
