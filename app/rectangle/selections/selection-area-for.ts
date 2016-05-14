import {Directive, OnInit, ElementRef, Input, OnChanges, OnDestroy} from 'angular2/core';
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
    private nativeElement: HTMLElement;
    selectionEventsHelper: SelectionEventsHelper;
    selectionManager: SelectionManager;
    @Input('multiple') allowMultipleSelection: boolean = true;
    @Input('rt-selection-area-for') items: Array<ISelectable>;
    @Input() autoSelectFirst: boolean = false;
    @Input() toggleOnly: boolean = false;

    constructor(el: ElementRef, selectionManager: SelectionManager) {
        this.selectionManager = selectionManager;
        this.nativeElement = el.nativeElement;
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
    ngOnInit(): void {
        if (this.items === undefined) {
            throw new Error('e2e4-selection-area  requires "items" attribute to be specified.');
        }
        if (this.nativeElement.tabIndex === -1) {
            this.nativeElement.tabIndex = 0;
        }
    }
    keyDownHandler(event: KeyboardEvent): void {
        this.selectionEventsHelper.keyboardHandler(event);
    }
}
