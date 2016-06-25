import { EventEmitter } from "@angular/core";

export class OnSelectedEvent {
    public index: number;
    public item: any;
    constructor(item: any, index: number) {
        this.item = item;
        this.index = index;
    }
}
export class OnDeselectedEvent {
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

export interface ISelectionEventsEmitter {
    onSelected: EventEmitter<OnSelectedEvent>;
    onDeselected: EventEmitter<OnDeselectedEvent>;
    onSelectionChanged: EventEmitter<OnSelectionChangedEvent>;
}