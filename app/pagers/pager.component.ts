import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

import {BufferedPagerComponent} from './buffered-pager.component';
import {SimplePagerComponent} from './simple-pager.component';
import {PagedPagerComponent} from './paged-pager.component';

@Component({
    directives: [BufferedPagerComponent, SimplePagerComponent, PagedPagerComponent],
    selector: 'pager',
    template: `<paged-pager *ngIf="hostList.isPagedList"></paged-pager>
                <buffered-pager *ngIf="hostList.isBufferedList"></buffered-pager>
                <simple-pager *ngIf="hostList.isSimpleList"></simple-pager>`
})
export class PagerComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
