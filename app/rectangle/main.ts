export {NgPagedListService} from './bootstrap/ngPagedListService';
export {NgBufferedListService} from './bootstrap/ngBufferedListService';
export {NgSimpleListService} from './bootstrap/ngSimpleListService';
export {Defaults} from './defaults';

import {ListComponent} from './lists/list.component';
import {E2E4LoadButton} from './lists/e2e4LoadButton';
import {E2E4ResetButton} from './lists/e2e4ResetButton';
import {E2E4RowNumber} from './lists/e2e4RowNumber';
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
    E2E4LoadButton,
    E2E4ResetButton,
    E2E4RowNumber,
    SortDirective,
    E2E4SelectionAreaFor,
    E2E4SelectableItem,
    E2E4SelectionCheckbox,
    E2E4Pager,
    E2E4BufferedPager,
    E2E4SimplePager,
    E2E4PagedPager
];
