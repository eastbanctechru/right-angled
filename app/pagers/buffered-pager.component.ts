import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

@Component({
    selector: 'buffered-pager',
    template: '<div>Buffered Pager</div>'
})
export class BufferedPagerComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
