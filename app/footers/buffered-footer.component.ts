import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';
import {FOOTER_DIRECTIVES} from '../rectangle/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'buffered-footer',
    templateUrl: 'app/footers/buffered-footer.component.html'
})
export class BufferedFooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
