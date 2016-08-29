import { DefaultSelectionService, SelectionTuple } from 'e2e4';

import { SelectionEventsEmitter } from './selection-events-emitter';
import { OnDeselected, OnSelected, OnSelectionChanged } from './selection-hooks';

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

            if ((<OnSelectionChanged>tuple.item).rtOnSelectionChanged !== undefined) {
                (<OnSelectionChanged>tuple.item).rtOnSelectionChanged(selected);
            }
            if (selected === true && (<OnSelected>tuple.item).rtOnSelected !== undefined) {
                (<OnSelected>tuple.item).rtOnSelected();
            }
            if (selected === false && (<OnDeselected>tuple.item).rtOnDeselected !== undefined) {
                (<OnDeselected>tuple.item).rtOnDeselected();
            }
        }
    }
    private emitEvents(emitter: SelectionEventsEmitter, selected: boolean, tuple: SelectionTuple): void {
        if (selected) {
            emitter.itemSelected.emit({ index: tuple.index, item: tuple.item });
        } else {
            emitter.itemDeselected.emit({ index: tuple.index, item: tuple.item });
        }
        emitter.selectionChanged.emit({ index: tuple.index, item: tuple.item });
    }
    public destroy(): void {
        delete this.areaEventsEmitter;
        this.eventEmitters.length = 0;
        super.destroy();
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
