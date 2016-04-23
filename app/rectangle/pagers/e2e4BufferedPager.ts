import {Component} from 'angular2/core';
import {ListComponent} from '../lists/list.component';

@Component({
    selector: 'e2e4-buffered-pager',
    template: '<div>Buffered Pager</div>'
})
export class E2E4BufferedPager {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
