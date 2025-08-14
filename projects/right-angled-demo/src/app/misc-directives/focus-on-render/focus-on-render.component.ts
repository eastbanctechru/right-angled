import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-focus-on-render',
    templateUrl: 'focus-on-render.component.html',
    standalone: false
})
export class FocusOnRenderComponent {
    public renderInput = false;
}
