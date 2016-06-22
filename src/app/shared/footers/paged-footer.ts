import {Component} from '@angular/core';
import {RtListComponent} from '../../../right-angled/lists/list';
import {FOOTER_DIRECTIVES} from '../../../right-angled/index';
import {MISC_DIRECTIVES} from '../../../right-angled/misc-directives';


@Component({
    directives: [FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    selector: 'rt-paged-footer',
    templateUrl: 'app/shared/footers/paged-footer.html'
})
export class PagedFooterComponent {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
