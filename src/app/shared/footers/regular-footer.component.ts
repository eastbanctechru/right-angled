import { Component } from '@angular/core';
import { ListComponent } from '../../../right-angled/list-directives/list.component';
import { REGULAR_FOOTER_DIRECTIVES } from '../../../right-angled/list-directives';

@Component({
    directives: [REGULAR_FOOTER_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-regular-footer',
    templateUrl: 'regular-footer.component.html'
})
export class RegularFooterComponent {
    constructor(public hostList: ListComponent) {
    }
}
