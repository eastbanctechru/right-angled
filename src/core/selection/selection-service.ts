import { DefaultSelectionService, SelectionTuple } from 'e2e4';

import { SelectionElementEventsEmitter } from './selection-element-events-emitter';
import { SelectionEventsEmitter } from './selection-events-emitter';

export class RTSelectionService extends DefaultSelectionService {
    public eventEmitters: SelectionElementEventsEmitter[] = new Array<SelectionElementEventsEmitter>();
    public childSelectionServices: RTSelectionService[] = new Array<RTSelectionService>();
    public areaEventsEmitter: SelectionEventsEmitter;
    protected processSelection(tuple: SelectionTuple, selected: boolean): void {
        const initialSelectState = this.eventEmitters[tuple.index].selected || null;
        if (initialSelectState === null || initialSelectState !== selected) {
            if (this.eventEmitters.length > tuple.index && this.eventEmitters[tuple.index]) {
                this.emitEvents(this.eventEmitters[tuple.index], selected, tuple);
                this.eventEmitters[tuple.index].postProcessSelection(selected);
            }
            if (this.areaEventsEmitter) {
                this.emitEvents(this.areaEventsEmitter, selected, tuple);
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
    public selectAll(recursive: boolean = true): void {
        super.selectAll();
        // run this directly after render to give child selectionAreas ability to render
        setTimeout(() => {
            if (recursive && this.childSelectionServices) {
                this.childSelectionServices.forEach((service) => {
                    service.selectAll(recursive);
                });
            }
        }, 0);
    }
    public deselectAll(recursive: boolean = true): void {
        if (recursive && this.childSelectionServices) {
            this.childSelectionServices.forEach((service) => {
                service.deselectAll(recursive);
            });
        }
        super.deselectAll();
    }
}
