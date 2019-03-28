import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-buffered-footer',
    styleUrls: ['buffered-footer.component.scss'],
    templateUrl: 'buffered-footer.component.html'
})
export class BufferedFooterComponent {}
