import {Component} from '@angular/core';
import {RtListComponent} from '../rectangle/lists/list';
import {FOOTER_DIRECTIVES} from '../rectangle/main';
import {MISC_DIRECTIVES} from '../rectangle/misc-directives';

@Component({
    directives: [FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    selector: 'buffered-footer',
    templateUrl: 'app/footers/buffered-footer.html'
})
export class BufferedFooter {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
