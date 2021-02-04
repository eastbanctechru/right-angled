import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Optional, Output, SkipSelf } from '@angular/core';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection.service';
import { RTSelectionEvent, SelectionElementEventsEmitter } from './providers/selection-events-emitter';
import { SelectionAreaDirective } from './selection-area.directive';

@Directive({
    exportAs: 'rtSelectionCheckboxFor',
    /* tslint:disable-next-line:directive-selector */
    selector: 'input[rtSelectionCheckboxFor]'
})
export class SelectionCheckboxForDirective implements SelectionElementEventsEmitter, AfterViewInit, OnDestroy {
    public index: number = null;
    // tslint:disable-next-line: no-input-rename
    @Input('rtSelectionCheckboxFor') public item: any = null;
    @Input()
    public get selected(): boolean {
        return this.selectedInternal;
    }
    public set selected(selected: boolean) {
        if (selected) {
            this.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
        } else {
            this.selectionService.deselectIndex(this.index);
        }
    }
    @Output()
    public readonly selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output()
    public readonly itemSelected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    @Output()
    public readonly itemDeselected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    @Output()
    public readonly selectionChanged: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    private selectedInternal = false;

    constructor(
        private elementRef: ElementRef,
        @Optional() private selectionArea: SelectionAreaDirective,
        @SkipSelf() public selectionEventsHelper: RTSelectionEventsHelper,
        @SkipSelf() private selectionService: RTSelectionService
    ) {}

    ngAfterViewInit() {
        this.selectionArea?.registerSelectionCheckbox(this, this.elementRef);
    }

    ngOnDestroy() {
        this.selectionArea?.unregisterSelectionCheckbox(this);
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
