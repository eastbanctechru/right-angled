import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-paged-footer',
    styleUrls: ['paged-footer.component.scss'],
    templateUrl: 'paged-footer.component.html',
    standalone: false
})
export class PagedFooterComponent {}
