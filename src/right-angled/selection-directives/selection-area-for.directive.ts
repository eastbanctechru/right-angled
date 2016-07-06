import { ContentChildren, QueryList, Host, HostListener, Directive, OnInit, Input, Output, OnChanges, OnDestroy, HostBinding } from '@angular/core';
import { SelectableItem, SelectionAreaConfig, SelectionEventsHelper } from 'e2e4';
import { NgSelectionService } from '../bootstrap/ng-selection-manager';
import { SelectionEventsEmitter } from '../bootstrap/selection-events-emitter';
import { OnSelectedEvent } from '../bootstrap/on-selected-event';
import { OnDeselectedEvent } from '../bootstrap/on-deselected-event';
import { OnSelectionChangedEvent } from '../bootstrap/on-selection-changed-event';
import { EventEmitter } from '@angular/core';

@Directive({
    providers: [NgSelectionService],
    selector: '[rt-selection-area-for]'
})
export class RtSelectionAreaForDirective implements SelectionEventsEmitter, OnInit, OnChanges, OnDestroy, SelectionAreaConfig {
    @ContentChildren(RtSelectionAreaForDirective) public childSelectionAreas: QueryList<RtSelectionAreaForDirective>;
    private _tabIndex: number;
    public selectionService: NgSelectionService;
    public selectionEventsHelper: SelectionEventsHelper;

    @Input('horizontal') public horizontal: boolean = false;
    @Input('multiple') public allowMultipleSelection: boolean = true;
    @Input('rt-selection-area-for') public items: Array<SelectableItem>;
    @Input() public autoSelectFirst: boolean = false;
    @Input() public toggleOnly: boolean = false;

    @Output('onItemSelected') public onSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output('onItemDeselected') public onDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() public onSelectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();

    constructor( @Host() selectionManager: NgSelectionService) {
        this.selectionService = selectionManager;
        this.selectionService.globalEmitter = this;
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
        return this._tabIndex === -1 ? 0 : this._tabIndex;
    }
    public set tabIndex(value: number) {
        this._tabIndex = value;
    }
    public ngOnInit(): void {
        if (this.items === undefined) {
            throw new Error('rt-selection-area-for requires "items" attribute to be specified.');
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
