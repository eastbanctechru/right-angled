import { Component } from '@angular/core';

import { RegularPager } from 'e2e4';

@Component({
    selector: 'rt-demo-footer',
    styleUrls: ['regular-footer.component.scss'],
    templateUrl: 'regular-footer.component.html'
})
export class RegularFooterComponent {
    constructor(public pager: RegularPager) {
    }
}
