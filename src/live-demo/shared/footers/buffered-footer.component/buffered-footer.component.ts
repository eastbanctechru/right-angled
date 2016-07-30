import { Component } from '@angular/core';
import { BUFFERED_FOOTER_DIRECTIVES } from 'right-angled';
import { MISC_DIRECTIVES } from 'right-angled';

@Component({
    directives: [BUFFERED_FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-buffered-footer',
    styleUrls: ['buffered-footer.component.css'],
    templateUrl: 'buffered-footer.component.html'
})
export class BufferedFooterComponent {
}
