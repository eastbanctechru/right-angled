import {Component} from 'angular2/core';
import {ListComponent} from '../lists/list.component';

@Component({
    selector: 'e2e4-paged-pager',
    template: '<div>Paged Pager</div>'
})
export class E2E4PagedPager {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
