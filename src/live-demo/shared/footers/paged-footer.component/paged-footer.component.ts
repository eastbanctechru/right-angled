import { Component } from '@angular/core';

import { PagedPager } from 'e2e4';

@Component({
    selector: 'rt-demo-paged-footer',
    styleUrls: ['paged-footer.component.scss'],
    templateUrl: 'paged-footer.component.html'
})
export class PagedFooterComponent {
    constructor(public pager: PagedPager) {
    }
}
