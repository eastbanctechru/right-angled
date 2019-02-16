import { EventEmitter } from '@angular/core';
import { RTSelectionEvent } from './selection-event';
export interface SelectionEventsEmitter {
    itemSelected: EventEmitter<RTSelectionEvent>;
    itemDeselected: EventEmitter<RTSelectionEvent>;
    selectionChanged: EventEmitter<RTSelectionEvent>;
}
