import {Component} from 'angular2/core';
import {E2E4List} from '../lists/e2e4List';

@Component({
    selector: 'e2e4-simple-pager',
    template: '<div>Simple Pager</div>'
})
export class E2E4SimplePager {
    hostList: E2E4List;
    constructor(hostList: E2E4List) {
        this.hostList = hostList;
    }
}
