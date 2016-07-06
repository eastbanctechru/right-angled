import { Component } from '@angular/core';
import { RtListComponent } from '../../../right-angled/list-components/list.component';
import { FOOTER_DIRECTIVES } from '../../../right-angled/index';
import { MISC_DIRECTIVES } from '../../../right-angled/misc-directives';

@Component({
    directives: [FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-paged-footer',
    templateUrl: 'paged-footer.component.html'
})
export class PagedFooterComponent {
    public hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
