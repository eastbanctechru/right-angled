import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-progress-bar',
    styleUrls: ['progress-bar.scss'],
    template: `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    `
})
export class ProgressBarComponent {}
