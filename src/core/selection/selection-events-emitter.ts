import { EventEmitter } from '@angular/core';

import { RtSelectionEvent } from './selection-event';

export interface SelectionEventsEmitter {
    itemSelected: EventEmitter<RtSelectionEvent>;
    itemDeselected: EventEmitter<RtSelectionEvent>;
    selectionChanged: EventEmitter<RtSelectionEvent>;
}
