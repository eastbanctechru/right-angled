import {
    AfterContentInit,
    ContentChildren,
    Directive,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    Self,
    SimpleChange
} from '@angular/core';
import { Subscription } from 'rxjs';

import { RTSelectionEvent } from './providers/selection-event';
import { SelectionEventsEmitter } from './providers/selection-events-emitter';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection-service';
import { SelectableDirective } from './selectable.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';

@Directive({
    exportAs: 'rtSelectionArea',
    providers: [RTSelectionService, RTSelectionEventsHelper],
    selector: '[rtSelectionArea]'
})
export class SelectionAreaDirective implements SelectionEventsEmitter, AfterContentInit, OnChanges, OnDestroy {
    @ContentChildren(SelectableDirective, { descendants: false })
    public selectableItems: QueryList<SelectableDirective>;
    @ContentChildren(SelectionCheckboxForDirective, { descendants: false })
    public childSelectionCheckboxes: QueryList<SelectionCheckboxForDirective>;
    @ContentChildren(SelectionAreaDirective, { descendants: false })
    public childSelectionAreas: QueryList<SelectionAreaDirective>;

    public itemsSubscription: Subscription;
    public checkboxesSubscription: Subscription;
    public childSelectionAreasSubscription: Subscription;

    @HostBinding('tabIndex')
    public tabIndex = 0;

    @Input()
    public set preventEventsDefaults(value: boolean) {
        this.selectionEventsHelper.preventEventsDefaults = value;
    }

    @Input()
    public set stopEventsPropagation(value: boolean) {
        this.selectionEventsHelper.stopEventsPropagation = value;
    }

    @Input()
    public set horizontal(value: boolean) {
        this.selectionEventsHelper.horizontal = value;
    }

    @Input()
    public set multiple(value: boolean) {
        this.selectionEventsHelper.multiple = value;
    }

    @Input()
    public set toggleOnly(value: boolean) {
        this.selectionEventsHelper.toggleOnly = value;
    }

    @Input()
    public autoSelectFirst = false;

    @Input()
    public set trackBy(value: (index: number, item: any) => any) {
        if (typeof value !== 'function') {
            throw new Error('trackBy parameter value must be a function');
        }
        this.selectionService.trackByFn = value;
    }

    @Output()
    public readonly itemSelected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();

    @Output()
    public readonly itemDeselected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();

    @Output()
    public readonly selectionChanged: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();

    constructor(@Self() public selectionService: RTSelectionService, @Self() public selectionEventsHelper: RTSelectionEventsHelper) {
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = selectionEventsHelper;
    }
    public ngOnDestroy(): void {
        this.itemsSubscription.unsubscribe();
        this.checkboxesSubscription.unsubscribe();
        this.childSelectionAreasSubscription.unsubscribe();
        this.selectionService.deselectAll();
        this.selectionService.destroy();
    }
    public ngOnChanges(changes: { multiple?: SimpleChange; autoSelectFirst?: SimpleChange }): void {
        if (false === this.selectionService.hasSelections() && changes.autoSelectFirst && changes.autoSelectFirst.currentValue === true) {
            this.selectionService.selectIndex(0, false);
        }
        if (changes.multiple && changes.multiple.currentValue === false) {
            const selectedIndexes = this.selectionService.getSelectedIndexes();
            if (selectedIndexes.length > 1) {
                selectedIndexes.splice(0, 1);
                selectedIndexes.forEach(index => {
                    this.selectionService.deselectIndex(index);
                });
            }
        }
    }

    @HostListener('keydown', ['$event.ctrlKey', '$event.shiftKey', '$event.keyCode', '$event.preventDefault', '$event.stopPropagation', '$event'])
    public keyDownHandler(
        ctrlKeyPressed: boolean,
        shiftKeyPressed: boolean,
        keyCode: number,
        preventDefaultFn: () => void,
        stopPropagationFn: () => void,
        executionContext: any
    ): void {
        if (this.selectionEventsHelper.keyboardHandler(ctrlKeyPressed, shiftKeyPressed, keyCode)) {
            if (this.selectionEventsHelper.preventEventsDefaults && preventDefaultFn) {
                preventDefaultFn.call(executionContext);
            }
            if (this.selectionEventsHelper.stopEventsPropagation && stopPropagationFn) {
                stopPropagationFn.call(executionContext);
            }
        }
    }
    public ngAfterContentInit(): void {
        if (this.selectableItems.length > 0) {
            this.buildSelectionSource(this.selectableItems);
        }
        if (this.childSelectionCheckboxes.length > 0) {
            this.buildSelectionSource(this.childSelectionCheckboxes);
        }
        this.buildSelectionServicesList(this.childSelectionAreas);
        this.itemsSubscription = this.selectableItems.changes.subscribe(this.buildSelectionSource.bind(this));
        this.checkboxesSubscription = this.childSelectionCheckboxes.changes.subscribe(this.buildSelectionSource.bind(this));
        this.childSelectionAreasSubscription = this.childSelectionAreas.changes.subscribe(this.buildSelectionServicesList.bind(this));
    }
    private buildSelectionSource(items: QueryList<SelectableDirective | SelectionCheckboxForDirective>): void {
        let index = 0;
        this.selectionService.eventEmitters = items.map(item => {
            if (item.index !== null && item.index !== index) {
                this.selectionService.deselectIndex(item.index);
            }
            item.index = index++;
            return item;
        });

        this.selectionService.items = items.map(item => item.item);
        if (this.selectionService.items.length > 0) {
            setTimeout(() => {
                // since we've modify collection on first render,
                // to prevent error 'Expression has changed after it was checked' we've do selection after render
                if (this.selectionService.items.length > 0) {
                    this.selectionService.checkSelection();
                    // repeats first element selection since checking can deselect all elements
                    if (false === this.selectionService.hasSelections() && this.autoSelectFirst) {
                        this.selectionService.selectIndex(0, false);
                    }
                }
            }, 0);
        }
    }
    private buildSelectionServicesList(items: QueryList<SelectionAreaDirective>): void {
        this.selectionService.childSelectionServices = items.filter(area => area !== this).map(area => area.selectionService);
    }
}
