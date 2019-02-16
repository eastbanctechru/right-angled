import { SelectionEventsHelper } from 'e2e4';
import { RTSelectionService } from './selection-service';
export declare class RTSelectionEventsHelper extends SelectionEventsHelper {
    preventEventsDefaults: boolean;
    stopEventsPropagation: boolean;
    constructor(selectionService: RTSelectionService);
}
