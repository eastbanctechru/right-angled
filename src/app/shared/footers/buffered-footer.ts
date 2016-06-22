import {Component} from '@angular/core';
import {RtListComponent} from '../../../right-angled/lists/list';
import {FOOTER_DIRECTIVES} from '../../../right-angled/index';
import {MISC_DIRECTIVES} from '../../../right-angled/misc-directives';

@Component({
    directives: [FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    selector: 'rt-buffered-footer',
    templateUrl: 'app/shared/footers/buffered-footer.html'
})
export class BufferedFooterComponent {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
