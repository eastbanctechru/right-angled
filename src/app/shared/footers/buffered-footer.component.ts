import { Component } from '@angular/core';
import { RtListComponent } from '../../../right-angled/lists/list';
import { FOOTER_DIRECTIVES } from '../../../right-angled/index';
import { MISC_DIRECTIVES } from '../../../right-angled/misc-directives';

@Component({
    directives: [FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-buffered-footer',
    templateUrl: 'buffered-footer.component.html'
})
export class BufferedFooterComponent {
    public hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
