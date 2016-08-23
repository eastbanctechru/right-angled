import { EventEmitter, ContentChildren, QueryList, Self, HostListener, Directive, OnInit, Input, Output, OnChanges, OnDestroy, HostBinding } from '@angular/core';
import { SelectionItem, SelectionAreaConfig, SelectionEventsHelper } from 'e2e4';

import { RtSelectionService } from './selection-service';
import { SelectionEventsEmitter } from './contract/selection-events-emitter';
import { OnSelectedEvent } from './contract/on-selected-event';
import { OnDeselectedEvent } from './contract/on-deselected-event';
import { OnSelectionChangedEvent } from './contract/on-selection-changed-event';

@Directive({
    providers: [RtSelectionService],
    selector: '[rtSelectionAreaFor]'
})
export class SelectionAreaForDirective implements SelectionEventsEmitter, OnInit, OnChanges, OnDestroy, SelectionAreaConfig {
    @ContentChildren(SelectionAreaForDirective) public childSelectionAreas: QueryList<SelectionAreaForDirective>;
    private tabIndexPrivate: number;
    public selectionEventsHelper: SelectionEventsHelper;

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
    @Output() public itemSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output() public itemDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() public selectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();

    constructor( @Self() public selectionService: RtSelectionService) {
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = new SelectionEventsHelper(this);
    }
    public ngOnDestroy(): void {
        this.selectionService.destroy();
    }
    public ngOnChanges(changes: any): void {
        // we doesn't set itemsSource to empty arrays to keep selection when trackByFn is provided
        // it's must not be a problem since on destroy selections will be destroyed by this component 
        if (changes.items && (!this.selectionService.itemsSource || !!this.trackBy || changes.items.currentValue.length > 0)) {
            this.selectionService.itemsSource = changes.items.currentValue;
        }
        if (false === this.selectionService.hasSelections() && this.autoSelectFirst === true) {
            this.selectionService.selectIndex(0, false);
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
            event.stopPropagation();
        }
    }
}
