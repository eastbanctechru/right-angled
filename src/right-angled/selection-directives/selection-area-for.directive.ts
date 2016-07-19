import { EventEmitter, ContentChildren, QueryList, Host, HostListener, Directive, OnInit, Input, Output, OnChanges, OnDestroy, HostBinding } from '@angular/core';
import { SelectableItem, SelectionAreaConfig, SelectionEventsHelper } from 'e2e4';

import { NgSelectionService } from '../services/ng-selection-service';
import { SelectionEventsEmitter, OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent } from '../services/selection-events-emitter';

@Directive({
    providers: [NgSelectionService],
    selector: '[rtSelectionAreaFor]'
})
export class SelectionAreaForDirective implements SelectionEventsEmitter, OnInit, OnChanges, OnDestroy, SelectionAreaConfig {
    @ContentChildren(SelectionAreaForDirective) public childSelectionAreas: QueryList<SelectionAreaForDirective>;
    private tabIndexPrivate: number;
    public selectionEventsHelper: SelectionEventsHelper;

    @Input() public horizontal: boolean = false;
    @Input() public multiple: boolean = true;
    @Input('rtSelectionAreaFor') public items: Array<SelectableItem>;
    @Input() public autoSelectFirst: boolean = false;
    @Input() public toggleOnly: boolean = false;

    @Output() public itemSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output() public itemDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() public selectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();

    constructor( @Host() public selectionService: NgSelectionService) {
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = new SelectionEventsHelper(this);
    }
    public ngOnDestroy(): void {
        this.selectionService.dispose();
    }
    public ngOnChanges(changes: any): void {
        if (changes.items) {
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
            event.preventDefault();
        }
    }
}
