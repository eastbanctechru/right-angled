import {Component} from '@angular/core';
import {RtListComponent} from '../rectangle/lists/list';
import {FOOTER_DIRECTIVES} from '../rectangle/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'simple-footer',
    templateUrl: 'app/footers/simple-footer.html'
})
export class SimpleFooter {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
