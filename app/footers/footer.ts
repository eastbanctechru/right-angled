import {Component} from 'angular2/core';
import {RtList} from '../rectangle/lists/list';

import {BufferedFooter} from './buffered-footer';
import {SimpleFooter} from './simple-footer';
import {PagedFooter} from './paged-footer';

@Component({
    directives: [BufferedFooter, SimpleFooter, PagedFooter],
    selector: 'footer',
    template: `<paged-footer *ngIf="hostList.isPagedList"></paged-footer>
                <buffered-footer *ngIf="hostList.isBufferedList"></buffered-footer>
                <simple-footer *ngIf="hostList.isSimpleList"></simple-footer>`
})
export class Footer {
    hostList: RtList;
    constructor(hostList: RtList) {
        this.hostList = hostList;
    }
}
