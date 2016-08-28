import { Component } from '@angular/core';

import { BasicUsageComponent } from './basic-usage/basic-usage.component';

@Component({
    directives: [BasicUsageComponent],
    moduleId: module.id,
    templateUrl: 'selection-sample.component.html'
})
export class SelectionSampleComponent {
}
