import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

@Component({
    selector: 'buffered-footer',
    template: '<div>Buffered footer</div>'
})
export class BufferedFooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
