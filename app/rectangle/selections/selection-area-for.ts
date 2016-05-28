import {Directive, OnInit, Input, OnChanges, OnDestroy, HostBinding} from '@angular/core';
import {SelectionManager} from 'e2e4/src/selectionManager';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';
import {ISelectionConfig} from 'e2e4/src/contracts/ISelectionConfig';
import {SelectionEventsHelper} from 'e2e4/src/selectionEventsHelper';

@Directive({
    host: {
        '(keydown)': 'keyDownHandler($event)'
    },
    providers: [SelectionManager],
    selector: '[rt-selection-area-for]'
})
export class RtSelectionAreaFor implements OnInit, OnChanges, OnDestroy, ISelectionConfig {
    selectionEventsHelper: SelectionEventsHelper;
    selectionManager: SelectionManager;
    @Input('multiple') allowMultipleSelection: boolean = true;
    @Input('rt-selection-area-for') items: Array<ISelectable>;
    @Input() autoSelectFirst: boolean = false;
    @Input() toggleOnly: boolean = false;

    constructor(selectionManager: SelectionManager) {
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
    _tabIndex: number;
    @HostBinding('tabIndex')
    get tabIndex(): number {
        return this._tabIndex === -1 ? 0 : this._tabIndex;
    }
    set tabIndex(value: number) {
        this._tabIndex = value;
    }
    ngOnInit(): void {
        if (this.items === undefined) {
            throw new Error('rt-selection-area-for requires "items" attribute to be specified.');
        }
    }
    keyDownHandler(event: KeyboardEvent): void {
        if (this.selectionEventsHelper.keyboardHandler(event.ctrlKey, event.shiftKey, event.keyCode)) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}
