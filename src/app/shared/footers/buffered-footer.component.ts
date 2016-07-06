import { Component } from '@angular/core';
import { ListComponent } from '../../../right-angled/list-directives/list.component';
import { BUFFERED_FOOTER_DIRECTIVES } from '../../../right-angled/list-directives';
import { MISC_DIRECTIVES } from '../../../right-angled/misc-directives';

@Component({
    directives: [BUFFERED_FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-buffered-footer',
    templateUrl: 'buffered-footer.component.html'
})
export class BufferedFooterComponent {
    public hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
}
