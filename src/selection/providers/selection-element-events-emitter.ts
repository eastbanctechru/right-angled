import { SelectionEventsEmitter } from './selection-events-emitter';
export interface SelectionElementEventsEmitter extends SelectionEventsEmitter {
    selected: boolean;
    postProcessSelection(selected: boolean): void;
}
