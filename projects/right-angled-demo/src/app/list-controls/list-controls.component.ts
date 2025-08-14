import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'list-controls.component.html',
    standalone: false
})
export class ListControlsComponent {}
