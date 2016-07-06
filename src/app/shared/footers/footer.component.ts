import { Component } from '@angular/core';
import { RtListComponent } from '../../../right-angled/lists/list';
import { BufferedFooterComponent } from './buffered-footer.component';
import { RegularFooterComponent } from './regular-footer.component';
import { PagedFooterComponent } from './paged-footer.component';

@Component({
    directives: [BufferedFooterComponent, RegularFooterComponent, PagedFooterComponent],
    selector: 'rt-footer',
    template: `<rt-paged-footer *ngIf="hostList.isPagedList"></rt-paged-footer>
                <rt-buffered-footer *ngIf="hostList.isBufferedList"></rt-buffered-footer>
                <rt-regular-footer *ngIf="hostList.isRegularList"></rt-regular-footer>`
})
export class FooterComponent {
    public hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
