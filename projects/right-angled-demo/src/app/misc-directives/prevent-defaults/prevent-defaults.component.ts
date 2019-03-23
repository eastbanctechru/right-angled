import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-prevent-defaults',
    templateUrl: 'prevent-defaults.component.html'
})
export class PreventDefaultsComponent {
    public preventDefaults = true;
}
