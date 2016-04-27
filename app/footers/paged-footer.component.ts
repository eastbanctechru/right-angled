import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';
import {FOOTER_DIRECTIVES} from '../rectangle/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'paged-footer',
    templateUrl: 'app/footers/paged-footer.component.html'
})
export class PagedFooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
