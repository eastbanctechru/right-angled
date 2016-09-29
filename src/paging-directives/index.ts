import { BufferedPagerComponent } from './buffered-pager.component';
import { LoadMoreDirective } from './load-more.directive';
import { RowCountDirective } from './row-count.directive';

export var BUFFERED_PAGER_DIRECTIVES: any[] = [
    BufferedPagerComponent,
    LoadMoreDirective,
    RowCountDirective
];
import { GoToFirstPageDirective } from './go-to-first-page.directive';
import { GoToLastPageDirective } from './go-to-last-page.directive';
import { GoToNextPageDirective } from './go-to-next-page.directive';
import { GoToPreviousPageDirective } from './go-to-previous-page.directive';
import { PageNumberDirective } from './page-number.directive';
import { PageSizeDirective } from './page-size.directive';
import { PagedPagerComponent } from './paged-pager.component';

export var PAGED_PAGER_DIRECTIVES: any[] = [
    PagedPagerComponent,
    GoToFirstPageDirective,
    GoToLastPageDirective,
    GoToNextPageDirective,
    GoToPreviousPageDirective,
    PageSizeDirective,
    PageNumberDirective
];
