import { EventEmitter } from '@angular/core';

export class OnDeselectedEvent {
    public index: number;
    public item: any;
    constructor(item: any, index: number) {
        this.item = item;
        this.index = index;
    }
}

export class OnSelectedEvent {
    public index: number;
    public item: any;
    constructor(item: any, index: number) {
        this.item = item;
        this.index = index;
    }
}

export class OnSelectionChangedEvent {
    public index: number;
    public item: any;
    constructor(item: any, index: number) {
        this.item = item;
        this.index = index;
    }
}

export interface SelectionEventsEmitter {
    itemSelected: EventEmitter<OnSelectedEvent>;
    itemDeselected: EventEmitter<OnDeselectedEvent>;
    selectionChanged: EventEmitter<OnSelectionChangedEvent>;
}
