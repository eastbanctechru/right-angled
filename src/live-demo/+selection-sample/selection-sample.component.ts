import { Component } from '@angular/core';

import { BasicUsageComponent } from './basic-usage/basic-usage.component';
import { CustomTrackByComponent } from './custom-track-by/custom-track-by.component';
import { HooksMethodsComponent } from './hook-methods/hook-methods.component';
import { SelectedFlagComponent } from './selected-flag/selected-flag.component';
import { SelectionEventsComponent } from './selection-events/selection-events.component';

@Component({
    directives: [BasicUsageComponent, CustomTrackByComponent, SelectedFlagComponent, HooksMethodsComponent, SelectionEventsComponent],
    moduleId: module.id,
    templateUrl: 'selection-sample.component.html'
})
export class SelectionSampleComponent {
}
