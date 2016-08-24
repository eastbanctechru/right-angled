import { EventEmitter } from '@angular/core';

import { OnDeselectedEvent } from './on-deselected-event';
import { OnSelectedEvent } from './on-selected-event';
import { OnSelectionChangedEvent } from './on-selection-changed-event';

export interface SelectionEventsEmitter {
    itemSelected: EventEmitter<OnSelectedEvent>;
    itemDeselected: EventEmitter<OnDeselectedEvent>;
    selectionChanged: EventEmitter<OnSelectionChangedEvent>;
}
