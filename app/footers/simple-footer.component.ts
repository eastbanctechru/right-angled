import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

@Component({
    selector: 'simple-footer',
    template: '<div>Simple footer</div>'
})
export class SimpleFooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
