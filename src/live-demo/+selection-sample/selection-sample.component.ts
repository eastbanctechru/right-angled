import { Component } from '@angular/core';

import { BasicUsageComponent } from './basic-usage/basic-usage.component';
import { CustomTrackByComponent } from './custom-track-by/custom-track-by.component';
import { HooksMethodsComponent } from './hook-methods/hook-methods.component';
import { OptionsComponent } from './options/options.component';
import { SelectedFlagComponent } from './selected-flag/selected-flag.component';
import { SelectionEventsComponent } from './selection-events/selection-events.component';

@Component({
    directives: [BasicUsageComponent, CustomTrackByComponent, SelectedFlagComponent, HooksMethodsComponent, OptionsComponent, SelectionEventsComponent],
    moduleId: module.id,
    styleUrls: ['selection-sample.component.css'],
    templateUrl: 'selection-sample.component.html'
})
export class SelectionSampleComponent {
}
