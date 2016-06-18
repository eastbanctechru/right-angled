import {Component} from '@angular/core';
import {RtListComponent} from '../../../right-angled/lists/list';

import {BufferedFooterComponent} from './buffered-footer';
import {SimpleFooterComponent} from './simple-footer';
import {PagedFooterComponent} from './paged-footer';

@Component({
    directives: [BufferedFooterComponent, SimpleFooterComponent, PagedFooterComponent],
    selector: 'rt-footer',
    template: `<rt-paged-footer *ngIf="hostList.isPagedList"></rt-paged-footer>
                <rt-buffered-footer *ngIf="hostList.isBufferedList"></rt-buffered-footer>
                <rt-simple-footer *ngIf="hostList.isSimpleList"></rt-simple-footer>`
})
export class FooterComponent {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
