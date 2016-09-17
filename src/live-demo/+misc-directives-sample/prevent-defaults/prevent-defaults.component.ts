import { Component } from '@angular/core';
@Component({
    selector: 'rt-demo-prevent-defaults',
    template: `<a rtPreventDefaults="click" href="https://github.com/fshchudlo/right-angled">this link is broken</a>`
})
export class PreventDefaultsComponent {
}
