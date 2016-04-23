import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

import {BufferedFooterComponent} from './buffered-footer.component';
import {SimpleFooterComponent} from './simple-footer.component';
import {PagedFooterComponent} from './paged-footer.component';

@Component({
    directives: [BufferedFooterComponent, SimpleFooterComponent, PagedFooterComponent],
    selector: 'footer',
    template: `<paged-footer *ngIf="hostList.isPagedList"></paged-footer>
                <buffered-footer *ngIf="hostList.isBufferedList"></buffered-footer>
                <simple-footer *ngIf="hostList.isSimpleList"></simple-footer>`
})
export class FooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
