import { ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Self, SimpleChange } from '@angular/core';
import { SelectionAreaConfig, SelectionEventsHelper, SelectionItem } from 'e2e4';

import { RtSelectionEvent } from '../core/selection/selection-event';
import { SelectionEventsEmitter } from '../core/selection/selection-events-emitter';
import { RtSelectionService } from '../core/selection/selection-service';

@Directive({
    providers: [RtSelectionService],
    selector: '[rtSelectionAreaFor]'
})
export class SelectionAreaForDirective implements SelectionEventsEmitter, OnInit, OnChanges, OnDestroy, SelectionAreaConfig {
    @ContentChildren(SelectionAreaForDirective) public childSelectionAreas: QueryList<SelectionAreaForDirective>;
    private tabIndexPrivate: number;
    public selectionEventsHelper: SelectionEventsHelper;

    @Input() public preventEventsDefaults: boolean = true;
    @Input() public stopEventsPropagation: boolean = true;
    @Input() public horizontal: boolean = false;
    @Input() public multiple: boolean = true;
    @Input('rtSelectionAreaFor') public items: Array<SelectionItem>;
    @Input() public autoSelectFirst: boolean = false;
    @Input() public toggleOnly: boolean = false;
    @Input() public set trackBy(value: (index: number, item: any) => any) {
        if (typeof value !== 'function') {
            throw new Error('trackBy parameter value must be a function');
        }
        this.selectionService.trackByFn = value;
    }
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();

    constructor( @Self() public selectionService: RtSelectionService) {
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = new SelectionEventsHelper(this);
    }
    public ngOnDestroy(): void {
        this.selectionService.destroy();
    }
    public ngOnChanges(changes: { multiple?: SimpleChange, items?: SimpleChange }): void {
        // we doesn't set itemsSource to empty arrays to keep selection when trackByFn is provided
        // it's must not be a problem since on destroy selections will be destroyed by this component 
        if (changes.items && (!this.selectionService.itemsSource || !!this.trackBy || changes.items.currentValue.length > 0)) {
            this.selectionService.itemsSource = changes.items.currentValue;
        }
        if (false === this.selectionService.hasSelections() && this.autoSelectFirst === true) {
            this.selectionService.selectIndex(0, false);
        }
        if (changes.multiple && changes.multiple.currentValue === false) {
            let selectedIndexes = this.selectionService.getSelectedIndexes();
            if (selectedIndexes.length > 1) {
                selectedIndexes.splice(0, 1);
                selectedIndexes.forEach((index) => this.selectionService.deselectIndex(index));
            }
        }
    }

    @HostBinding('tabIndex')
    public get tabIndex(): number {
        return this.tabIndexPrivate === -1 ? 0 : this.tabIndexPrivate;
    }
    public set tabIndex(value: number) {
        this.tabIndexPrivate = value;
    }
    public ngOnInit(): void {
        if (this.items === undefined) {
            throw new Error('rtSelectionAreaFor requires "items" attribute to be specified.');
        }
    }
    @HostListener('keydown', ['$event'])
    public keyDownHandler(event: KeyboardEvent): void {
        if (this.selectionEventsHelper.keyboardHandler(event.ctrlKey, event.shiftKey, event.keyCode)) {
            if (this.preventEventsDefaults) {
                event.preventDefault();
            }
            if (this.stopEventsPropagation) {
                event.stopPropagation();
            }
        }
    }
}
