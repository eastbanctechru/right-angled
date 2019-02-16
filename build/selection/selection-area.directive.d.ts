import { AfterContentInit, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { RTSelectionEvent } from './providers/selection-event';
import { SelectionEventsEmitter } from './providers/selection-events-emitter';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection-service';
import { SelectableDirective } from './selectable.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';
export declare class SelectionAreaDirective implements SelectionEventsEmitter, AfterContentInit, OnChanges, OnDestroy {
    selectionService: RTSelectionService;
    selectionEventsHelper: RTSelectionEventsHelper;
    selectableItems: QueryList<SelectableDirective>;
    childSelectionCheckboxes: QueryList<SelectionCheckboxForDirective>;
    childSelectionAreas: QueryList<SelectionAreaDirective>;
    itemsSubscription: Subscription;
    checkboxesSubscription: Subscription;
    childSelectionAreasSubscription: Subscription;
    tabIndex: number;
    preventEventsDefaults: boolean;
    stopEventsPropagation: boolean;
    horizontal: boolean;
    multiple: boolean;
    toggleOnly: boolean;
    autoSelectFirst: boolean;
    trackBy: (index: number, item: any) => any;
    readonly itemSelected: EventEmitter<RTSelectionEvent>;
    readonly itemDeselected: EventEmitter<RTSelectionEvent>;
    readonly selectionChanged: EventEmitter<RTSelectionEvent>;
    constructor(selectionService: RTSelectionService, selectionEventsHelper: RTSelectionEventsHelper);
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        multiple?: SimpleChange;
        autoSelectFirst?: SimpleChange;
    }): void;
    keyDownHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, keyCode: number, preventDefaultFn: () => void, stopPropagationFn: () => void, executionContext: any): void;
    ngAfterContentInit(): void;
    private buildSelectionSource;
    private buildSelectionServicesList;
}
