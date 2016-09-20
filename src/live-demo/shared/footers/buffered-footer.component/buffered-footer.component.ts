import { Component } from '@angular/core';

import { BufferedPager } from 'e2e4';

@Component({
    selector: 'rt-demo-buffered-footer',
    styleUrls: ['buffered-footer.component.scss'],
    templateUrl: 'buffered-footer.component.html'
})
export class BufferedFooterComponent {
    constructor(public pager: BufferedPager) {
    }
}
