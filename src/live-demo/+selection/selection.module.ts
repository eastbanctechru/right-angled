import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BasicUsageComponent } from './basic-usage/basic-usage.component';
import { CustomTrackByComponent } from './custom-track-by/custom-track-by.component';
import { OptionsComponent } from './options/options.component';
import { SelectAllComponent } from './select-all/select-all.component';
import { SelectedFlagComponent } from './selected-flag/selected-flag.component';
import { SelectionCheckboxComponent } from './selection-checkbox/selection-checkbox.component';
import { CountryDetailsComponent } from './selection-events/country-details/country-details.component';
import { SelectionEventsComponent } from './selection-events/selection-events.component';
import { SelectionComponent } from './selection.component';
import { NestedButtonComponent } from './service-injection/nested-button.component';
import { ServiceInjectionComponent } from './service-injection/service-injection.component';
import { ServiceViewChildComponent } from './service-view-child/service-view-child.component';

@NgModule({
    declarations: [
        BasicUsageComponent,
        CustomTrackByComponent,
        CountryDetailsComponent,
        OptionsComponent,
        SelectAllComponent,
        SelectedFlagComponent,
        SelectionCheckboxComponent,
        SelectionEventsComponent,
        SelectionComponent,
        ServiceViewChildComponent,
        ServiceInjectionComponent,
        NestedButtonComponent],
    exports: [BasicUsageComponent,
        CustomTrackByComponent,
        CountryDetailsComponent,
        OptionsComponent,
        SelectAllComponent,
        SelectedFlagComponent,
        SelectionCheckboxComponent,
        SelectionEventsComponent,
        SelectionComponent,
        ServiceViewChildComponent,
        ServiceInjectionComponent,
        NestedButtonComponent],
    imports: [CommonModule, RouterModule, SharedModule]
})
export class SelectionModule {
}
