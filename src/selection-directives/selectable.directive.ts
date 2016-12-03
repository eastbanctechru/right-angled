import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { SkipSelf } from '@angular/core';

import { RtSelectionEvent, RtSelectionEventsHelper, SelectionEventsEmitter } from '../core';

@Directive({
    exportAs: 'rtSelectable',
    selector: '[rtSelectable]'
})
export class SelectableDirective implements SelectionEventsEmitter {
    public static settings: {
        selectedClassName: string
    } =
    {
        selectedClassName: 'rt-selected'
    };
    public selected: boolean = false;
    public index: number = null;
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtSelectable') public item: any = null;
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    constructor( @SkipSelf() public selectionEventsHelper: RtSelectionEventsHelper, private renderer: Renderer, private el: ElementRef) {
    }
    @HostListener('mouseup', ['$event.ctrlKey', '$event.shiftKey', '$event.which', '$event.preventDefault', '$event.stopPropagation', '$event'])
    public mouseUpHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: number, preventDefaultFn: Function, stopPropagationFn: Function, executionContext: any): void {
        if (this.selectionEventsHelper.mouseHandler(ctrlKeyPressed, shiftKeyPressed, mouseButton, this.index)) {
            this.clearWindowSelection();
            if (this.selectionEventsHelper.preventEventsDefaults && preventDefaultFn) {
                preventDefaultFn.call(executionContext);
            }
            if (this.selectionEventsHelper.stopEventsPropagation && stopPropagationFn) {
                stopPropagationFn.call(executionContext);
            }
        }
    }
    public setSelection(selected: boolean): void {
        if (selected === this.selected) {
            return;
        }
        this.selected = selected;
        if (SelectableDirective.settings.selectedClassName) {
            this.renderer.setElementClass(this.el.nativeElement, SelectableDirective.settings.selectedClassName, this.selected);
        }
    }
    private clearWindowSelection(): void {
        try {
            if (window && window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        } catch (e) {
            // do nothing 
        }
    }
}
