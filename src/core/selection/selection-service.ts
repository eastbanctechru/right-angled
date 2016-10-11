import { DefaultSelectionService, SelectionTuple } from 'e2e4';

import { SelectionEventsEmitter } from './selection-events-emitter';

export class RtSelectionService extends DefaultSelectionService {
    public eventEmitters: Array<SelectionEventsEmitter> = new Array<SelectionEventsEmitter>();
    public childSelectionServices: Array<RtSelectionService> = new Array<RtSelectionService>();
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
        if (Object.prototype.hasOwnProperty.call(emitter, 'selected')) {
            (<any>emitter).selected = selected;
        }
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
    public selectAllItems(recursive: boolean): void {
        super.selectAll();
        // run this directly after render to give child selectionAreas ability to render
        setTimeout(() => {
            if (recursive && this.childSelectionServices) {
                this.childSelectionServices.forEach(service => {
                    if (service !== this) {
                        service.selectAllItems(recursive);
                    }
                });
            }
        }, 0);
    }
    public deselectAllItems(recursive: boolean): void {
        if (recursive && this.childSelectionServices) {
            this.childSelectionServices.forEach(service => {
                if (service !== this) {
                    service.deselectAllItems(recursive);
                }
            });
        }
        this.deselectAll();
    }
}
