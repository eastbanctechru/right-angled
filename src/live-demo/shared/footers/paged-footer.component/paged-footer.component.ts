import { Component } from '@angular/core';
import { PAGED_FOOTER_DIRECTIVES } from 'right-angled';
import { MISC_DIRECTIVES } from 'right-angled';

@Component({
    directives: [PAGED_FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-paged-footer',
    styleUrls: ['paged-footer.component.css'],
    templateUrl: 'paged-footer.component.html'
})
export class PagedFooterComponent {
}
