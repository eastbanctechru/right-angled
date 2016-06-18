import {Component} from '@angular/core';
import {RtListComponent} from '../../../right-angled/lists/list';
import {FOOTER_DIRECTIVES} from '../../../right-angled/main';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'rt-simple-footer',
    templateUrl: 'app/shared/footers/simple-footer.html'
})
export class SimpleFooterComponent {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
