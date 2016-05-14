import {Component} from '@angular/core';
import {RtList} from '../rectangle/lists/list';
import {FOOTER_DIRECTIVES} from '../rectangle/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'paged-footer',
    templateUrl: 'app/footers/paged-footer.html'
})
export class PagedFooter {
    hostList: RtList;
    constructor(hostList: RtList) {
        this.hostList = hostList;
    }
}
