import {Component} from 'angular2/core';
import {ListComponent} from '../lists/list.component';

import {E2E4BufferedPager} from './e2e4BufferedPager';
import {E2E4SimplePager} from './e2e4SimplePager';
import {E2E4PagedPager} from './e2e4PagedPager';

@Component({
    directives: [E2E4BufferedPager, E2E4SimplePager, E2E4PagedPager],
    selector: 'e2e4-pager',
    template: `<e2e4-paged-pager *ngIf="hostList.isPagedList"></e2e4-paged-pager>
                <e2e4-buffered-pager *ngIf="hostList.isBufferedList"></e2e4-buffered-pager>
                <e2e4-simple-pager *ngIf="hostList.isSimpleList"></e2e4-simple-pager>`
})
export class E2E4Pager {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
