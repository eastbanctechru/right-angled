import { Component } from '@angular/core';
import { RtListComponent } from '../../../right-angled/lists/list.component';
import { FOOTER_DIRECTIVES } from '../../../right-angled/index';

@Component({
    directives: [FOOTER_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-regular-footer',
    templateUrl: 'regular-footer.component.html'
})
export class RegularFooterComponent {
    public hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
