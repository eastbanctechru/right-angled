import { Directive, EventEmitter, HostListener, Input, OnInit, Output, SkipSelf } from '@angular/core';

import { RtSelectionEvent } from '../core/selection/selection-event';
import { SelectionEventsEmitter } from '../core/selection/selection-events-emitter';
import { SelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: '[rtSelectByIndex]'
})
export class SelectByIndexDirective implements SelectionEventsEmitter, OnInit {
    @Input('rtSelectByIndex') public index: number = null;
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();

    constructor( @SkipSelf() private selectionArea: SelectionAreaForDirective) {
    }
    public ngOnInit(): void {
        this.selectionArea.selectionService.registerEventEmitter(this, this.index);
    }
    @HostListener('mouseup', ['$event'])
    public mouseUpHandler(event: MouseEvent): void {
        if (this.selectionArea.selectionEventsHelper.mouseHandler(event.ctrlKey, event.shiftKey, event.which, this.index)) {
            this.clearWindowSelection();
            if (this.selectionArea.preventEventDefaults) {
                event.preventDefault();
            }
            if (this.selectionArea.stopEventsPropagation) {
                event.stopPropagation();
            }
        }
    }

    private clearWindowSelection(): void {
        try {
            if (window && window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document && document.hasOwnProperty('selection')) {
                /* tslint:disable-next-line:no-string-literal */
                document['selection'].empty();
            }
        } catch (e) {// do nothing 
        }
    }
}
