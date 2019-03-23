import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['quick-tour.component.scss'],
    templateUrl: 'quick-tour.component.html'
})
export class QuickTourComponent {}
