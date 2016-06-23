import {ViewChildren, QueryList, Host, HostListener, Directive, OnInit, Input, OnChanges, OnDestroy, HostBinding} from '@angular/core';
import {ISelectable, ISelectionConfig, SelectionManager, SelectionEventsHelper} from 'e2e4';

@Directive({
    providers: [SelectionManager],
    selector: '[rt-selection-area-for]'
})
export class RtSelectionAreaForDirective implements OnInit, OnChanges, OnDestroy, ISelectionConfig {
    @ViewChildren(RtSelectionAreaForDirective) childSelectionAreas: QueryList<RtSelectionAreaForDirective>;
    selectionEventsHelper: SelectionEventsHelper;
    selectionManager: SelectionManager;

    @Input('multiple') allowMultipleSelection: boolean = true;
    @Input('rt-selection-area-for') items: Array<ISelectable>;
    @Input() autoSelectFirst: boolean = false;
    @Input() toggleOnly: boolean = false;

    constructor( @Host() selectionManager: SelectionManager) {
        this.selectionManager = selectionManager;
        this.selectionEventsHelper = new SelectionEventsHelper(this);
    }
    ngOnDestroy(): void {
        this.selectionManager.dispose();
    }
    ngOnChanges(changes: any): void {
        if (changes.items) {
            this.selectionManager.itemsSource = changes.items.currentValue;
        }
        if (false === this.selectionManager.hasSelections() && this.autoSelectFirst === true) {
            this.selectionManager.selectIndex(0, false);
        }
    }
    private tabIndexInternal: number;
    @HostBinding('tabIndex')
    get tabIndex(): number {
        return this.tabIndexInternal === -1 ? 0 : this.tabIndexInternal;
    }
    set tabIndex(value: number) {
        this.tabIndexInternal = value;
    }
    ngOnInit(): void {
        if (this.items === undefined) {
            throw new Error('rt-selection-area-for requires "items" attribute to be specified.');
        }
    }
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.selectionEventsHelper.keyboardHandler(event.ctrlKey, event.shiftKey, event.keyCode)) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}
