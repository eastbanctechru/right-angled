import {Component} from 'angular2/core';
import {ListComponent} from '../lists/list.component';

@Component({
    selector: 'e2e4-simple-pager',
    template: '<div>Simple Pager</div>'
})
export class E2E4SimplePager {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
