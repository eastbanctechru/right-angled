import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';

@Component({
    selector: 'paged-footer',
    template: '<div>Paged footer</div>'
})
export class PagedFooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
