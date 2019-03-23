import { EventEmitter } from '@angular/core';

export interface RTSelectionEvent {
    item: any;
    index: number;
}
export interface SelectionEventsEmitter {
    itemSelected: EventEmitter<RTSelectionEvent>;
    itemDeselected: EventEmitter<RTSelectionEvent>;
    selectionChanged: EventEmitter<RTSelectionEvent>;
}
export interface SelectionElementEventsEmitter extends SelectionEventsEmitter {
    selected: boolean;
    postProcessSelection(selected: boolean): void;
}
