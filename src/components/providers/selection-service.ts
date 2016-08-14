import { SelectionTuple, DefaultSelectionService, SelectionItem } from 'e2e4';

import { SelectionEventsEmitter, OnDeselectedEvent, OnSelectedEvent, OnSelectionChangedEvent } from './selection-events-emitter';

export interface OnSelected extends SelectionItem {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} при выборе данного элемента.
     */
    rtOnSelected(): void;
}
export interface OnDeselected extends SelectionItem {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} при отмене выбора данного элемента.
     */
    rtOnDeselected?(): void;
}
export interface OnSelectionChanged extends SelectionItem {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} как при выборе, так и при отмене выбора данного элемента.
     */
    rtOnSelectionChanged?(selected: boolean): void;
}

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
            emitter.itemSelected.emit(new OnSelectedEvent(tuple.item, tuple.index));
        } else {
            emitter.itemDeselected.emit(new OnDeselectedEvent(tuple.item, tuple.index));
        }
        emitter.selectionChanged.emit(new OnSelectionChangedEvent(tuple.item, tuple.index));
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
