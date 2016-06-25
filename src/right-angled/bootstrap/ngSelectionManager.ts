import {ISelectionTuple, SelectionManager} from 'e2e4';
import {OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent, ISelectionEventsEmitter} from './ISelectionEventsEmitter';
import { EventEmitter } from "@angular/core";

export class NgSelectionManager extends SelectionManager {
    private eventEmitters: Array<ISelectionEventsEmitter> = new Array<ISelectionEventsEmitter>();
    public globalEmitter: ISelectionEventsEmitter;
    protected processSelection(tuple: ISelectionTuple, selected: boolean): void {
        const initialSelectState = tuple.item.selected;
        super.processSelection(tuple, selected);
        if (initialSelectState !== selected) {
            if (this.eventEmitters.length > tuple.index && this.eventEmitters[tuple.index]) {
                this.emitEvents(this.eventEmitters[tuple.index], selected, tuple);
            }
            if (this.globalEmitter) {
                this.emitEvents(this.globalEmitter, selected, tuple);
            }
        }
    }
    private emitEvents(emitter: ISelectionEventsEmitter, selected: boolean, tuple: ISelectionTuple): void {
        if (selected) {
            emitter.onSelected.emit(new OnSelectedEvent(tuple.item, tuple.index));
        }
        else {
            emitter.onDeselected.emit(new OnDeselectedEvent(tuple.item, tuple.index));
        }
        emitter.onSelectionChanged.emit(new OnSelectionChangedEvent(tuple.item, tuple.index));
    }
    public dispose(): void {
        delete this.globalEmitter;
        this.eventEmitters.length = 0;
        super.dispose();
    }
    public registerEventEmitter(emitter: ISelectionEventsEmitter, index: number): void {
        this.eventEmitters[index] = emitter;
    }
    public unregisterEventEmitter(emitter: ISelectionEventsEmitter, index: number): void {
        if (this.eventEmitters[index] === emitter) {
            this.eventEmitters[index] = null;
        }
    }
} 