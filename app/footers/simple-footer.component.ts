import {Component} from 'angular2/core';
import {ListComponent} from '../rectangle/lists/list.component';
import {FOOTER_DIRECTIVES} from '../rectangle/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'simple-footer',
    templateUrl: 'app/footers/simple-footer.component.html'
})
export class SimpleFooterComponent {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
