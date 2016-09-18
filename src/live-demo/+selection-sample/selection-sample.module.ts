import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BasicUsageComponent } from './basic-usage/basic-usage.component';
import { CustomTrackByComponent } from './custom-track-by/custom-track-by.component';
import { HooksMethodsComponent } from './hook-methods/hook-methods.component';
import { OptionsComponent } from './options/options.component';
import { SelectAllComponent } from './select-all/select-all.component';
import { SelectedFlagComponent } from './selected-flag/selected-flag.component';
import { SelectionCheckboxComponent } from './selection-checkbox/selection-checkbox.component';
import { CountryDetailsComponent } from './selection-events/country-details/country-details.component';
import { SelectionEventsComponent } from './selection-events/selection-events.component';
import { SelectionSampleComponent } from './selection-sample.component';

@NgModule({
    declarations: [BasicUsageComponent, CustomTrackByComponent, HooksMethodsComponent, CountryDetailsComponent, OptionsComponent, SelectAllComponent, SelectedFlagComponent, SelectionCheckboxComponent, SelectionEventsComponent, SelectionSampleComponent],
    exports: [BasicUsageComponent, CustomTrackByComponent, HooksMethodsComponent, CountryDetailsComponent, OptionsComponent, SelectAllComponent, SelectedFlagComponent, SelectionCheckboxComponent, SelectionEventsComponent, SelectionSampleComponent],
    imports: [CommonModule, RouterModule, SharedModule]
})
export class SelectionSampleModule {
}
