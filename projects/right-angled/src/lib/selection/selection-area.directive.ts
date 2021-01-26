import {
    AfterContentInit,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    Self,
    SimpleChange,
    SkipSelf
} from '@angular/core';
import { animationFrameScheduler, EMPTY, scheduled, Subject, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { SelectionEventsEmitter, RTSelectionEvent } from './providers/selection-events-emitter';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection.service';
import { SelectableDirective } from './selectable.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';

interface SelectableElement {
    selectable: SelectableDirective | SelectionCheckboxForDirective;
    element: HTMLElement;
}

@Directive({
    exportAs: 'rtSelectionArea',
    providers: [RTSelectionService, RTSelectionEventsHelper],
    selector: '[rtSelectionArea]'
})
export class SelectionAreaDirective implements SelectionEventsEmitter, AfterContentInit, OnChanges, OnDestroy {
    private selectableItems: SelectableElement[] = [];
    private childSelectionCheckboxes: SelectableElement[] = [];
    private childSelectionAreas = new Set<SelectionAreaDirective>();
    private selectablesChangedSubscription: Subscription;
    private selectablesChangedSubject = new Subject<(SelectableDirective | SelectionCheckboxForDirective)[]>();
    private childSelectionAreasChangedSubscription: Subscription;
    private childSelectionAreasChangedSubject = new Subject<Set<SelectionAreaDirective>>();

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

    constructor(
        @SkipSelf() @Optional() private parentSelectionArea: SelectionAreaDirective,
        @Self() public selectionService: RTSelectionService, 
        @Self() public selectionEventsHelper: RTSelectionEventsHelper) {
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = selectionEventsHelper;
    }

    ngOnInit() {
        this.selectablesChangedSubscription = this.selectablesChangedSubject.pipe(
            debounce(() => scheduled(EMPTY, animationFrameScheduler))
        ).subscribe(items => this.buildSelectionSource(items));

        this.childSelectionAreasChangedSubscription = this.childSelectionAreasChangedSubject.pipe(
            debounce(() => scheduled(EMPTY, animationFrameScheduler))
        ).subscribe(items => this.buildSelectionServicesList(items));
    }
    
    ngAfterViewInit() {
        this.parentSelectionArea?.registerChildSelectionArea(this);
    }

    public ngOnDestroy(): void {
        this.selectionService.deselectAll();
        this.selectionService.destroy();
        this.parentSelectionArea?.unregisterChildSelectionArea(this);
        this.selectablesChangedSubscription?.unsubscribe();
        this.childSelectionAreasChangedSubscription?.unsubscribe();
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
    //#region callbacks for DOM descendants
    public registerSelectable(selectable: SelectableDirective, elementRef: ElementRef): void {
        const element = elementRef.nativeElement as HTMLElement;
        let i = 0;
        for (; i < this.selectableItems.length; i++) {
            if (this.selectableItems[i].element.compareDocumentPosition(element) & document.DOCUMENT_POSITION_PRECEDING) {
                this.selectableItems.splice(i, 0, { element, selectable });
                break;
            }
        }
        if (i === this.selectableItems.length) {
            this.selectableItems.push({element, selectable});
        }
        this.selectablesChangedSubject.next(this.selectableItems.map(x => x.selectable))
    }
    public unregisterSelectable(selectable: SelectableDirective): void {
        const idx = this.selectableItems.findIndex(x => x.selectable === selectable);
        if (idx >= 0) {
            this.selectableItems.splice(idx, 1);
        }
        this.selectablesChangedSubject.next(this.selectableItems.map(x => x.selectable));
    }

    public registerSelectionCheckbox(checkbox: SelectionCheckboxForDirective, elementRef: ElementRef): void {
        const element = elementRef.nativeElement as HTMLElement;
        let i = 0;
        for (; i < this.childSelectionCheckboxes.length; i++) {
            if (this.childSelectionCheckboxes[i].element.compareDocumentPosition(element) & document.DOCUMENT_POSITION_PRECEDING) {
                this.childSelectionCheckboxes.splice(i, 0, { element, selectable: checkbox });
                break;
            }
        }
        if (i === this.childSelectionCheckboxes.length) {
            this.childSelectionCheckboxes.push({element, selectable: checkbox});
        }
        this.selectablesChangedSubject.next(this.childSelectionCheckboxes.map(x => x.selectable))
    }
    public unregisterSelectionCheckbox(checkbox: SelectionCheckboxForDirective): void {
        const idx = this.childSelectionCheckboxes.findIndex(x => x.selectable === checkbox);
        if (idx >= 0) {
            this.childSelectionCheckboxes.splice(idx, 1);
        }
        this.selectablesChangedSubject.next(this.childSelectionCheckboxes.map(x => x.selectable));
    }

    public registerChildSelectionArea(selectionArea: SelectionAreaDirective): void {
        if (!this.childSelectionAreas.has(selectionArea)) {
            this.childSelectionAreas.add(selectionArea);
            this.childSelectionAreasChangedSubject.next(this.childSelectionAreas);
        }
    }
    public unregisterChildSelectionArea(selectionArea: SelectionAreaDirective): void {
        if (this.childSelectionAreas.has(selectionArea)) {
            this.childSelectionAreas.delete(selectionArea);
            this.childSelectionAreasChangedSubject.next(this.childSelectionAreas);
        }
    }
    //#endregion

    public ngAfterContentInit(): void {
        if (this.selectableItems.length > 0) {
            this.buildSelectionSource(this.selectableItems.map(item => item.selectable));
        }
        if (this.childSelectionCheckboxes.length > 0) {
            this.buildSelectionSource(this.childSelectionCheckboxes.map(item => item.selectable));
        }
        this.buildSelectionServicesList(this.childSelectionAreas);
    }

    private buildSelectionSource(items: (SelectableDirective | SelectionCheckboxForDirective)[]): void {
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
                if (this.selectionService.items?.length > 0) {
                    this.selectionService.checkSelection();
                    // repeats first element selection since checking can deselect all elements
                    if (false === this.selectionService.hasSelections() && this.autoSelectFirst) {
                        this.selectionService.selectIndex(0, false);
                    }
                }
            }, 0);
        }
    }
    private buildSelectionServicesList(items: Set<SelectionAreaDirective>): void {
        this.selectionService.childSelectionServices = Array.from(items)
            .filter(area => area !== this)
            .map(area => area.selectionService);
    }
}
