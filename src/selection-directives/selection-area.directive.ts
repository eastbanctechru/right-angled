import { AfterContentInit, ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, Output, QueryList, Self, SimpleChange } from '@angular/core';
import { SkipSelf, forwardRef } from '@angular/core';
import { SelectionAreaConfig, SelectionEventsHelper } from 'e2e4';
import { Subscription } from 'rxjs/Subscription';

import { RtSelectionEvent } from '../core/selection/selection-event';
import { SelectionEventsEmitter } from '../core/selection/selection-events-emitter';
import { RtSelectionService } from '../core/selection/selection-service';

@Directive({
    exportAs: 'rtSelectionArea',
    providers: [RtSelectionService],
    selector: '[rtSelectionArea]'
})
export class SelectionAreaDirective implements SelectionEventsEmitter, AfterContentInit, OnChanges, OnDestroy, SelectionAreaConfig {
    // tslint:disable: no-forward-ref
    @ContentChildren(forwardRef(() => SelectableDirective), { descendants: false }) public selectableItems: QueryList<SelectableDirective>;
    @ContentChildren(forwardRef(() => SelectionCheckboxForDirective)) public childSelectionCheckboxes: QueryList<SelectionCheckboxForDirective>;
    // tslint:enable: no-forward-ref
    @ContentChildren(SelectionAreaDirective) public childSelectionAreas: QueryList<SelectionAreaDirective>;

    private tabIndexPrivate: number;
    private itemsSubscription: Subscription;
    private checkboxesSubscription: Subscription;

    public selectionEventsHelper: SelectionEventsHelper;
    @Input() public preventEventsDefaults: boolean = true;
    @Input() public stopEventsPropagation: boolean = true;
    @Input() public horizontal: boolean = false;
    @Input() public multiple: boolean = true;
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
        if (this.itemsSubscription) {
            this.itemsSubscription.unsubscribe();
        }
        if (this.checkboxesSubscription) {
            this.checkboxesSubscription.unsubscribe();
        }
        this.selectionService.deselectAll();
        this.selectionService.destroy();
    }
    public ngOnChanges(changes: { multiple?: SimpleChange, autoSelectFirst?: SimpleChange }): void {
        if (false === this.selectionService.hasSelections() && changes.autoSelectFirst && changes.autoSelectFirst.currentValue === true) {
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
    private buildSelectionSource(items: QueryList<SelectableDirective | SelectionCheckboxForDirective>): void {
        let index = 0;
        this.selectionService.eventEmitters = items.map(item => {
            item.index = index++;
            return item;
        });

        this.selectionService.items = items.map(item => item.item);
        if (this.selectionService.items.length > 0) {
            setTimeout(() => {
                // since we've modify collection on first render, to prevent error 'Expression has changed after it was checked' we've do selection after render
                this.selectionService.checkSelection();
                if (false === this.selectionService.hasSelections() && this.autoSelectFirst) {
                    this.selectionService.selectIndex(0, false);
                }
            }, 0);
        }
    }
    public ngAfterContentInit(): void {
        if (this.selectableItems.length > 0) {
            this.buildSelectionSource(this.selectableItems);
        }
        if (this.childSelectionCheckboxes.length > 0) {
            this.buildSelectionSource(this.childSelectionCheckboxes);
        }
        this.itemsSubscription = this.selectableItems.changes.subscribe(this.buildSelectionSource.bind(this));
        this.checkboxesSubscription = this.childSelectionCheckboxes.changes.subscribe(this.buildSelectionSource.bind(this));
    }
    public selectAllItems(recursive: boolean): void {
        this.selectionService.selectAll();
        // run this directly after render to give child selectionAreas ability to render
        setTimeout(() => {
            if (recursive && this.childSelectionAreas) {
                this.childSelectionAreas.toArray().forEach(area => {
                    if (area !== this) {
                        area.selectAllItems(recursive);
                    }
                });
            }
        }, 0);
    }
    public deselectAllItems(recursive: boolean): void {
        if (recursive && this.childSelectionAreas) {
            this.childSelectionAreas.toArray().forEach(area => {
                if (area !== this) {
                    area.deselectAllItems(recursive);
                }
            });
        }
        this.selectionService.deselectAll();
    }
}

@Directive({
    exportAs: 'rtSelectable',
    selector: '[rtSelectable]'
})
export class SelectableDirective implements SelectionEventsEmitter {
    public selected: boolean = false;
    public index: number = null;
    @Input('rtSelectable') public item: any = null;
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    constructor( @SkipSelf() public selectionArea: SelectionAreaDirective) {
    }
    @HostListener('mouseup', ['$event'])
    public mouseUpHandler(event: MouseEvent): void {
        if (this.selectionArea.selectionEventsHelper.mouseHandler(event.ctrlKey, event.shiftKey, event.which, this.index)) {
            this.clearWindowSelection();
            if (this.selectionArea.preventEventsDefaults) {
                event.preventDefault();
            }
            if (this.selectionArea.stopEventsPropagation) {
                event.stopPropagation();
            }
        }
    }

    private clearWindowSelection(): void {
        try {
            if (window && window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document && document.hasOwnProperty('selection')) {
                /* tslint:disable-next-line:no-string-literal */
                document['selection'].empty();
            }
        } catch (e) {// do nothing 
        }
    }
}

@Directive({
    exportAs: 'rtSelectionCheckboxFor',
    selector: 'input[rtSelectionCheckboxFor]'
})
export class SelectionCheckboxForDirective implements SelectionEventsEmitter {
    public index: number = null;
    @Input('rtSelectionCheckboxFor') public item: any = null;
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();

    constructor( @SkipSelf() private selectionService: RtSelectionService) {
    }

    @HostBinding('checked')
    public get isChecked(): boolean {
        return this.selectionService.isIndexSelected(this.index);
    }
    @HostListener('change', ['$event'])
    public changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionService.selectIndex(this.index, true);
        } else {
            this.selectionService.deselectIndex(this.index);
        }
    }
}
