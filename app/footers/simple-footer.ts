import {Component} from '@angular/core';
import {RtList} from '../rectangle/lists/list';
import {FOOTER_DIRECTIVES} from '../rectangle/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'simple-footer',
    templateUrl: 'app/footers/simple-footer.html'
})
export class SimpleFooter {
    hostList: RtList;
    constructor(hostList: RtList) {
        this.hostList = hostList;
    }
}
