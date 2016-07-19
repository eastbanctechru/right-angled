import { SelectionTuple, DefaultSelectionService } from 'e2e4';

import { SelectionEventsEmitter, OnDeselectedEvent, OnSelectedEvent, OnSelectionChangedEvent } from './selection-events-emitter';

export class RtSelectionService extends DefaultSelectionService {
    private eventEmitters: Array<SelectionEventsEmitter> = new Array<SelectionEventsEmitter>();
    public areaEventsEmitter: SelectionEventsEmitter;
    protected processSelection(tuple: SelectionTuple, selected: boolean): void {
        const initialSelectState = tuple.item.selected;
        super.processSelection(tuple, selected);
        if (initialSelectState !== selected) {
            if (this.eventEmitters.length > tuple.index && this.eventEmitters[tuple.index]) {
                this.emitEvents(this.eventEmitters[tuple.index], selected, tuple);
            }
            if (this.areaEventsEmitter) {
                this.emitEvents(this.areaEventsEmitter, selected, tuple);
            }
        }
    }
    private emitEvents(emitter: SelectionEventsEmitter, selected: boolean, tuple: SelectionTuple): void {
        if (selected) {
            emitter.itemSelected.emit(new OnSelectedEvent(tuple.item, tuple.index));
        } else {
            emitter.itemDeselected.emit(new OnDeselectedEvent(tuple.item, tuple.index));
        }
        emitter.selectionChanged.emit(new OnSelectionChangedEvent(tuple.item, tuple.index));
    }
    public dispose(): void {
        delete this.areaEventsEmitter;
        this.eventEmitters.length = 0;
        super.dispose();
    }
    public registerEventEmitter(emitter: SelectionEventsEmitter, index: number): void {
        this.eventEmitters[index] = emitter;
    }
    public unregisterEventEmitter(emitter: SelectionEventsEmitter, index: number): void {
        if (this.eventEmitters[index] === emitter) {
            this.eventEmitters[index] = null;
        }
    }
}
