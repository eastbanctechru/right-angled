import { Component } from '@angular/core';
import { REGULAR_FOOTER_DIRECTIVES } from 'right-angled';

@Component({
    directives: [REGULAR_FOOTER_DIRECTIVES],
    moduleId: module.id,
    // tslint:disable-next-line: component-selector-name component-selector-type component-selector-prefix
    selector: 'rt-demo-footer',
    styleUrls: ['regular-footer.component.css'],
    templateUrl: 'regular-footer.component.html'
})
export class RegularFooterComponent {
}
