import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FocusOnRenderComponent } from './focus-on-render/focus-on-render.component';
import { MiscDirectivesComponent } from './misc-directives.component';
import { PreventDefaultsComponent } from './prevent-defaults/prevent-defaults.component';
import { SelectOnFocusComponent } from './select-on-focus/select-on-focus.component';
import { StopEventsComponent } from './stop-events/stop-events.component';

@NgModule({
    declarations: [MiscDirectivesComponent, FocusOnRenderComponent, SelectOnFocusComponent, StopEventsComponent, PreventDefaultsComponent],
    exports: [MiscDirectivesComponent, FocusOnRenderComponent, SelectOnFocusComponent, StopEventsComponent, PreventDefaultsComponent],
    imports: [CommonModule, SharedModule]
})
export class MiscDirectivesModule { }
