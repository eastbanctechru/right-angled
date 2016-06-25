import {SkipSelf, HostListener, Directive, Input, Output, Host, OnInit} from '@angular/core';
import {RtSelectionAreaForDirective} from './selection-area-for';
import {OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent, ISelectionEventsEmitter} from '../bootstrap/ISelectionEventsEmitter';
import { EventEmitter } from "@angular/core";

@Directive({
    selector: '[rt-select-by-index]'
})
export class RtSelectByIndexDirective implements ISelectionEventsEmitter, OnInit {
    private selectionArea: RtSelectionAreaForDirective;
    @Input('rt-select-by-index') index: number = null;
    @Output() onSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output() onDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() onSelectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();


    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    ngOnInit(): void {
        this.selectionArea.selectionManager.registerEventEmitter(this, this.index);
    }
    @HostListener('mouseup', ['$event'])
    mouseUpHandler(event: MouseEvent): void {
        if (this.selectionArea.selectionEventsHelper.mouseHandler(event.ctrlKey, event.shiftKey, event.which, this.index)) {
            setTimeout(this.clearWindowSelection, 0);
        }
    }

    clearWindowSelection(): void {
        try {
            if (window && window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document && document.hasOwnProperty('selection')) {
                /* tslint:disable:no-string-literal */
                document['selection'].empty();
                /* tslint:enable:no-string-literal */
            }
        } catch (e) {

        }
    }
}
