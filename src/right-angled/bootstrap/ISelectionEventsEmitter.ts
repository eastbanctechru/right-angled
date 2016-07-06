import { EventEmitter } from '@angular/core';
import { OnDeselectedEvent } from './onDeselectedEvent';
import { OnSelectedEvent } from './onSelectedEvent';
import { OnSelectionChangedEvent } from './onSelectionChangedEvent';

export interface ISelectionEventsEmitter {
    onSelected: EventEmitter<OnSelectedEvent>;
    onDeselected: EventEmitter<OnDeselectedEvent>;
    onSelectionChanged: EventEmitter<OnSelectionChangedEvent>;
}
