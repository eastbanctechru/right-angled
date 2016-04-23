import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

@Component({
    selector: 'simple-pager',
    template: '<div>Simple Pager</div>'
})
export class SimplePagerComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
