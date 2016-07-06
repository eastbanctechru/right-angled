import { Component } from '@angular/core';
import { ListComponent } from '../../../right-angled/list-directives/list.component';

import { BufferedFooterComponent } from './buffered-footer.component';
import { RegularFooterComponent } from './regular-footer.component';
import { PagedFooterComponent } from './paged-footer.component';

@Component({
    directives: [BufferedFooterComponent, RegularFooterComponent, PagedFooterComponent],
    selector: 'rt-demo-footer',
    template: `<rt-demo-paged-footer *ngIf="hostList.isPagedList"></rt-demo-paged-footer>
                <rt-demo-buffered-footer *ngIf="hostList.isBufferedList"></rt-demo-buffered-footer>
                <rt-demo-regular-footer *ngIf="hostList.isRegularList"></rt-demo-regular-footer>`
})
export class FooterComponent {
    public hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
