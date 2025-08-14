import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-select-on-focus',
    templateUrl: 'select-on-focus.component.html',
    standalone: false
})
export class SelectOnFocusComponent {}
