export {NgPagedListService} from './bootstrap/ngPagedListService';
export {NgBufferedListService} from './bootstrap/ngBufferedListService';
export {NgSimpleListService} from './bootstrap/ngSimpleListService';
export {Defaults} from './defaults';

import {ListComponent} from './lists/list.component';
import {LoadButtonDirective} from './lists/load-button.directive';
import {ResetButtonDirective} from './lists/reset-button.directive';
import {RowNumberComponent} from './lists/row-number.component';
import {SortDirective} from './lists/sort.directive';
import {E2E4SelectionAreaFor} from './selections/e2e4SelectionAreaFor';
import {E2E4SelectableItem} from './selections/e2e4SelectableItem';
import {E2E4SelectionCheckbox} from './selections/e2e4SelectionCheckbox';

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
    E2E4SelectionAreaFor,
    E2E4SelectableItem,
    E2E4SelectionCheckbox,
    E2E4Pager,
    E2E4BufferedPager,
    E2E4SimplePager,
    E2E4PagedPager
];
