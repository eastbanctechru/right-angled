import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MiscDirectivesSampleComponent } from './misc-directives-sample.component';
import { PreventDefaultsComponent } from './prevent-defaults/prevent-defaults.component';
import { StopEventsComponent } from './stop-events/stop-events.component';

@NgModule({
    declarations: [MiscDirectivesSampleComponent, StopEventsComponent, PreventDefaultsComponent],
    exports: [MiscDirectivesSampleComponent, StopEventsComponent, PreventDefaultsComponent],
    imports: [CommonModule, SharedModule]
})
export class MiscDirectivesSampleModule { }
