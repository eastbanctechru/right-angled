import { EventEmitter } from '@angular/core';

export class OnDeselectedEvent {
    constructor(public item: any, public index: number) {
    }
}

export class OnSelectedEvent {
    constructor(public item: any, public index: number) {
    }
}

export class OnSelectionChangedEvent {
    constructor(public item: any, public index: number) {
    }
}

export interface SelectionEventsEmitter {
    itemSelected: EventEmitter<OnSelectedEvent>;
    itemDeselected: EventEmitter<OnDeselectedEvent>;
    selectionChanged: EventEmitter<OnSelectionChangedEvent>;
}
