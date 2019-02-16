import { DefaultSelectionService, SelectionTuple } from 'e2e4';
import { SelectionElementEventsEmitter } from './selection-element-events-emitter';
import { SelectionEventsEmitter } from './selection-events-emitter';
export declare class RTSelectionService extends DefaultSelectionService {
    eventEmitters: SelectionElementEventsEmitter[];
    childSelectionServices: RTSelectionService[];
    areaEventsEmitter: SelectionEventsEmitter;
    destroy(): void;
    selectAll(recursive?: boolean): void;
    deselectAll(recursive?: boolean): void;
    processSelection(tuple: SelectionTuple, selected: boolean): void;
    emitEvents(emitter: SelectionEventsEmitter, selected: boolean, tuple: SelectionTuple): void;
}
