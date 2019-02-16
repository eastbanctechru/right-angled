import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { SelectionElementEventsEmitter } from './providers/selection-element-events-emitter';
import { RTSelectionEvent } from './providers/selection-event';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
export declare class SelectableDirective implements SelectionElementEventsEmitter {
    selectionEventsHelper: RTSelectionEventsHelper;
    private renderer;
    private el;
    static settings: {
        selectedClassName: string;
    };
    index: number;
    item: any;
    readonly selectedChange: EventEmitter<boolean>;
    readonly itemSelected: EventEmitter<RTSelectionEvent>;
    readonly itemDeselected: EventEmitter<RTSelectionEvent>;
    readonly selectionChanged: EventEmitter<RTSelectionEvent>;
    private selectedInternal;
    constructor(selectionEventsHelper: RTSelectionEventsHelper, renderer: Renderer2, el: ElementRef);
    selected: boolean;
    mouseUpHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: number, preventDefaultFn: () => void, stopPropagationFn: () => void, executionContext: any): void;
    postProcessSelection(selected: boolean): void;
    clearWindowSelection(): void;
}
