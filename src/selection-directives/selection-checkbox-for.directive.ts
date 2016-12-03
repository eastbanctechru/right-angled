import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { RtSelectionEvent, RtSelectionEventsHelper, RtSelectionService, SelectionElementEventsEmitter } from '../core';

@Directive({
    exportAs: 'rtSelectionCheckboxFor',
    /* tslint:disable-next-line:directive-selector */
    selector: 'input[rtSelectionCheckboxFor]'
})
export class SelectionCheckboxForDirective implements SelectionElementEventsEmitter {
    private selectedInternal: boolean = false;
    public index: number = null;
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtSelectionCheckboxFor') public item: any = null;
    @Input() public get selected(): boolean {
        return this.selectedInternal;
    }
    public set selected(selected: boolean) {
        setTimeout(() => {
            // we perform selected handling to run possible deselection in next change detection cycle
            if (selected) {
                this.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
            } else {
                this.selectionService.deselectIndex(this.index);
            }
        });
    }
    @Output() public selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();

    constructor( @SkipSelf() public selectionEventsHelper: RtSelectionEventsHelper, @SkipSelf() private selectionService: RtSelectionService) {
    }

    @HostBinding('checked')
    public get isChecked(): boolean {
        return this.selectionService.isIndexSelected(this.index);
    }
    @HostListener('change', ['$event.target.checked'])
    public changeHandler(isChecked: boolean): void {
        if (isChecked) {
            this.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
        } else {
            this.selectionService.deselectIndex(this.index);
        }
    }
    public postProcessSelection(selected: boolean): void {
        if (selected === this.selected) {
            return;
        }
        this.selectedInternal = selected;
        this.selectedChange.emit(this.selectedInternal);
    }
}
