import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer, SkipSelf } from '@angular/core';
import { SelectionElementEventsEmitter } from './providers/selection-element-events-emitter';
import { RTSelectionEvent } from './providers/selection-event';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';

@Directive({
    exportAs: 'rtSelectable',
    selector: '[rtSelectable]'
})
export class SelectableDirective implements SelectionElementEventsEmitter {
    public static settings: { selectedClassName: string } = {
        selectedClassName: 'rt-selected'
    };
    public index: number = null;
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtSelectable') public item: any = null;
    @Output() public selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public itemSelected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    private selectedInternal: boolean = false;
    constructor( @SkipSelf() public selectionEventsHelper: RTSelectionEventsHelper, private renderer: Renderer, private el: ElementRef) {
    }

    @Input() public get selected(): boolean {
        return this.selectedInternal;
    }
    public set selected(selected: boolean) {
        setTimeout(() => {
            // we perform selected handling to run possible deselection in next change detection cycle
            if (selected) {
                this.selectionEventsHelper.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
            } else {
                this.selectionEventsHelper.selectionService.deselectIndex(this.index);
            }
        });
    }

    @HostListener('mouseup', ['$event.ctrlKey', '$event.shiftKey', '$event.which', '$event.preventDefault', '$event.stopPropagation', '$event'])
    public mouseUpHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: number, preventDefaultFn: () => void, stopPropagationFn: () => void, executionContext: any): void {
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
    public postProcessSelection(selected: boolean): void {
        if (selected === this.selected) {
            return;
        }
        this.selectedInternal = selected;
        this.selectedChange.emit(this.selectedInternal);
        if (SelectableDirective.settings.selectedClassName) {
            this.renderer.setElementClass(this.el.nativeElement, SelectableDirective.settings.selectedClassName, this.selected);
        }
    }
    public clearWindowSelection(): void {
        try {
            window.getSelection().removeAllRanges();
        } catch (e) {
            // do nothing
        }
    }
}
