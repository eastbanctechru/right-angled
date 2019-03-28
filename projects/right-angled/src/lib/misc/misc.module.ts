import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusOnRenderDirective } from './focus-on-render.directive';
import { PreventDefaultsDirective } from './prevent-defaults.directive';
import { SelectOnFocusDirective } from './select-on-focus.directive';
import { StopEventsDirective } from './stop-events.directive';

@NgModule({
    declarations: [FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective],
    exports: [FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective],
    imports: [CommonModule]
})
export class RTMiscModule {}
export { FocusOnRenderDirective } from './focus-on-render.directive';
export { SelectOnFocusDirective } from './select-on-focus.directive';
export { StopEventsDirective } from './stop-events.directive';
export { PreventDefaultsDirective } from './prevent-defaults.directive';
