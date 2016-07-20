import { Component } from '@angular/core';
import { BUFFERED_FOOTER_DIRECTIVES } from '../../../right-angled/list-directives';
import { MISC_DIRECTIVES } from '../../../right-angled/misc-directives';

@Component({
    directives: [BUFFERED_FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-buffered-footer',
    templateUrl: 'buffered-footer.component.html'
})
export class BufferedFooterComponent {
}
