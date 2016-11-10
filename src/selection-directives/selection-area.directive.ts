import { AfterContentInit, ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, Output, QueryList, Self, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RtSelectionEvent, RtSelectionEventsHelper, RtSelectionService, SelectionEventsEmitter } from '../core';
import { SelectableDirective } from './selectable.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';

@Directive({
    exportAs: 'rtSelectionArea',
    providers: [RtSelectionService, RtSelectionEventsHelper],
    selector: '[rtSelectionArea]'
})
export class SelectionAreaDirective implements SelectionEventsEmitter, AfterContentInit, OnChanges, OnDestroy {
    @ContentChildren(SelectableDirective, { descendants: false }) public selectableItems: QueryList<SelectableDirective>;
    @ContentChildren(SelectionCheckboxForDirective, { descendants: false }) public childSelectionCheckboxes: QueryList<SelectionCheckboxForDirective>;
    @ContentChildren(SelectionAreaDirective, { descendants: false }) public childSelectionAreas: QueryList<SelectionAreaDirective>;

    private tabIndexPrivate: number;
    private itemsSubscription: Subscription;
    private checkboxesSubscription: Subscription;
    private childSelectionAreasSubscription: Subscription;

    @Input() public set preventEventsDefaults(value: boolean) {
        this.selectionEventsHelper.preventEventsDefaults = value;
    }
    @Input() public set stopEventsPropagation(value: boolean) {
        this.selectionEventsHelper.stopEventsPropagation = value;
    }
    @Input() public set horizontal(value: boolean) {
        this.selectionEventsHelper.horizontal = value;
    }
    @Input() public set multiple(value: boolean) {
        this.selectionEventsHelper.multiple = value;
    }
    @Input() public set toggleOnly(value: boolean) {
        this.selectionEventsHelper.toggleOnly = value;
    }
    @Input() public autoSelectFirst: boolean = false;
    @Input() public set trackBy(value: (index: number, item: any) => any) {
        if (typeof value !== 'function') {
            throw new Error('trackBy parameter value must be a function');
        }
        this.selectionService.trackByFn = value;
    }
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();

    constructor( @Self() public selectionService: RtSelectionService, @Self() public selectionEventsHelper: RtSelectionEventsHelper) {
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = selectionEventsHelper;
    }
    public ngOnDestroy(): void {
        if (this.itemsSubscription) {
            this.itemsSubscription.unsubscribe();
        }
        if (this.checkboxesSubscription) {
            this.checkboxesSubscription.unsubscribe();
        }
        if (this.childSelectionAreasSubscription) {
            this.childSelectionAreasSubscription.unsubscribe();
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
        return (this.tabIndexPrivate === undefined || this.tabIndexPrivate === null || this.tabIndexPrivate === -1) ? 0 : this.tabIndexPrivate;
    }
    public set tabIndex(value: number) {
        this.tabIndexPrivate = value;
    }
    @HostListener('keydown', ['$event.ctrlKey', '$event.shiftKey', '$event.keyCode', '$event.preventDefault', '$event.stopPropagation'])
    public keyDownHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, keyCode: number, preventDefaultFn: Function, stopPropagationFn: Function): void {
        if (this.selectionEventsHelper.keyboardHandler(ctrlKeyPressed, shiftKeyPressed, keyCode)) {
            if (this.selectionEventsHelper.preventEventsDefaults) {
                preventDefaultFn();
            }
            if (this.selectionEventsHelper.stopEventsPropagation) {
                stopPropagationFn();
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
        if (this.childSelectionAreas.length > 0) {
            this.selectionService.childSelectionServices = this.childSelectionAreas.map(area => area.selectionService);
        }
        this.itemsSubscription = this.selectableItems.changes.subscribe(this.buildSelectionSource.bind(this));
        this.checkboxesSubscription = this.childSelectionCheckboxes.changes.subscribe(this.buildSelectionSource.bind(this));
        this.childSelectionAreasSubscription = this.childSelectionAreas.changes.subscribe((changes) => this.selectionService.childSelectionServices = changes.map(area => area.selectionService));
    }
}
