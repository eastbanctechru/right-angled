import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['quick-tour.component.scss'],
    templateUrl: 'quick-tour.component.html',
    standalone: false
})
export class QuickTourComponent {}
