import { EventEmitter } from '@angular/core';
import { SelectionElementEventsEmitter } from './providers/selection-element-events-emitter';
import { RTSelectionEvent } from './providers/selection-event';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection-service';
export declare class SelectionCheckboxForDirective implements SelectionElementEventsEmitter {
    selectionEventsHelper: RTSelectionEventsHelper;
    private selectionService;
    index: number;
    item: any;
    selected: boolean;
    readonly selectedChange: EventEmitter<boolean>;
    readonly itemSelected: EventEmitter<RTSelectionEvent>;
    readonly itemDeselected: EventEmitter<RTSelectionEvent>;
    readonly selectionChanged: EventEmitter<RTSelectionEvent>;
    private selectedInternal;
    constructor(selectionEventsHelper: RTSelectionEventsHelper, selectionService: RTSelectionService);
    readonly isChecked: boolean;
    changeHandler(isChecked: boolean): void;
    postProcessSelection(selected: boolean): void;
}
