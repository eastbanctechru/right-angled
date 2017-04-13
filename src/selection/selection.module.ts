import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectableDirective } from './selectable.directive';
import { SelectionAreaDirective } from './selection-area.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';

@NgModule({
    declarations: [
        SelectableDirective,
        SelectionAreaDirective,
        SelectionCheckboxForDirective
    ],
    exports: [
        SelectableDirective,
        SelectionAreaDirective,
        SelectionCheckboxForDirective],
    imports: [CommonModule]
})
export class RTSelectionModule { }

export { RTSelectionService } from './providers/selection-service';
export { SelectionEventsEmitter } from './providers/selection-events-emitter';
export { SelectionElementEventsEmitter } from './providers/selection-element-events-emitter';
export { RTSelectionEvent } from './providers/selection-event';
export { RTSelectionEventsHelper } from './providers/selection-events-helper';
export { SelectableDirective } from './selectable.directive';
export { SelectionAreaDirective } from './selection-area.directive';
export { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';
