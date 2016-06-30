import { ContentChildren, QueryList, Host, HostListener, Directive, OnInit, Input, Output, OnChanges, OnDestroy, HostBinding } from '@angular/core';
import { ISelectable, ISelectionConfig, SelectionEventsHelper } from 'e2e4';
import { NgSelectionManager } from '../bootstrap/ngSelectionManager';
import { OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent, ISelectionEventsEmitter } from '../bootstrap/ISelectionEventsEmitter';
import { EventEmitter } from '@angular/core';


@Directive({
    providers: [NgSelectionManager],
    selector: '[rt-selection-area-for]'
})
export class RtSelectionAreaForDirective implements ISelectionEventsEmitter, OnInit, OnChanges, OnDestroy, ISelectionConfig {
    @ContentChildren(RtSelectionAreaForDirective) public childSelectionAreas: QueryList<RtSelectionAreaForDirective>;
    private selectionEventsHelper: SelectionEventsHelper;
    private tabIndexInternal: number;
    public selectionManager: NgSelectionManager;

    @Input('multiple') public allowMultipleSelection: boolean = true;
    @Input('rt-selection-area-for') public items: Array<ISelectable>;
    @Input() public autoSelectFirst: boolean = false;
    @Input() public toggleOnly: boolean = false;

    @Output('onItemSelected') public onSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output('onItemDeselected') public onDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() public onSelectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();

    constructor( @Host() selectionManager: NgSelectionManager) {
        this.selectionManager = selectionManager;
        this.selectionManager.globalEmitter = this;
        this.selectionEventsHelper = new SelectionEventsHelper(this);
    }
    public ngOnDestroy(): void {
        this.selectionManager.dispose();
    }
    public ngOnChanges(changes: any): void {
        if (changes.items) {
            this.selectionManager.itemsSource = changes.items.currentValue;
        }
        if (false === this.selectionManager.hasSelections() && this.autoSelectFirst === true) {
            this.selectionManager.selectIndex(0, false);
        }
    }

    @HostBinding('tabIndex')
    public get tabIndex(): number {
        return this.tabIndexInternal === -1 ? 0 : this.tabIndexInternal;
    }
    public set tabIndex(value: number) {
        this.tabIndexInternal = value;
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
