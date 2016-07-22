import { EventEmitter, SkipSelf, HostListener, Directive, Input, Output, OnInit } from '@angular/core';

import { SelectionAreaForDirective } from './selection-area-for.directive';
import { SelectionEventsEmitter, OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent } from '../services/selection-events-emitter';

@Directive({
    selector: '[rtSelectByIndex]'
})
export class SelectByIndexDirective implements SelectionEventsEmitter, OnInit {
    @Input('rtSelectByIndex') public index: number = null;
    @Output() public itemSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output() public itemDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() public selectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();

    constructor( @SkipSelf() private selectionArea: SelectionAreaForDirective) {
    }
    public ngOnInit(): void {
        this.selectionArea.selectionService.registerEventEmitter(this, this.index);
    }
    @HostListener('mouseup', ['$event'])
    public mouseUpHandler(event: MouseEvent): void {
        if (this.selectionArea.selectionEventsHelper.mouseHandler(event.ctrlKey, event.shiftKey, event.which, this.index)) {
            setTimeout(this.clearWindowSelection, 0);
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
