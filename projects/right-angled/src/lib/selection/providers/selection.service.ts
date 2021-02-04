import { SelectionEventsEmitter, SelectionElementEventsEmitter } from './selection-events-emitter';
import { Injectable } from '@angular/core';
export interface SelectionTuple {
    index: number;
    item: any;
}
/**
 * Represents possible operations with selection model.
 */
@Injectable()
export class RTSelectionService {
    public eventEmitters: SelectionElementEventsEmitter[] = new Array<SelectionElementEventsEmitter>();
    public childSelectionServices: RTSelectionService[] = new Array<RTSelectionService>();
    public areaEventsEmitter: SelectionEventsEmitter;
    /**
     * Index of last selected/deselected element in {@link items} collection.
     */

    public lastProcessedIndex: number;
    /**
     * Optional function which can be used to compare {@link items} elements.
     *
     * This function can be used by {@link checkSelection}.
     *
     * Also it's reasonable to use this function for {@link getItemIndex}.
     * @param index index of element in {@link items} collection.
     * @param actual element from {@link items} collection.
     */
    public trackByFn: (index: number, item: any) => any;
    /**
     * Collection of elements for selection.
     */
    public items: any[];

    /**
     * Collection of {@link SelectionTuple} elements which represents currently selected items in {@link items} collection.
     */
    private selectionsList: SelectionTuple[] = new Array<SelectionTuple>();

    constructor() {
        this.trackByFn = this.trackByIdentity;
    }
    /**
     * Performs application-defined logic for service destroy.
     */
    public destroy(): void {
        this.areaEventsEmitter = null;
        this.eventEmitters.length = 0;
        this.selectionsList.length = 0;
        this.lastProcessedIndex = null;
        this.items = null;
    }
    /**
     * Performs check that every selected element is actually selected.
     *
     */
    public checkSelection(): void {
        if (this.items !== null && typeof this.items !== 'undefined') {
            for (let i = this.selectionsList.length - 1; i >= 0; i--) {
                const tuple = this.selectionsList[i];
                const trackFn = this.trackByFn || this.trackByIdentity;
                if (this.isIndexAcceptable(tuple.index) && trackFn(tuple.index, this.items[tuple.index]) === trackFn(tuple.index, tuple.item)) {
                    tuple.item = this.items[tuple.index];
                    this.selectItem(tuple, true);
                } else {
                    this.deselectItem(tuple);
                }
            }
        } else {
            this.deselectAll();
        }
    }
    /**
     * Checks that applied index is valid number and it's value is inside {@link items} boundaries.
     * @param index index to check.
     * @returns `true` if index is valid.
     */
    public isIndexAcceptable(index: number): boolean {
        return index !== null && typeof index !== 'undefined' && index >= 0 && this.items && this.items.length > index;
    }
    /**
     * Selects range of elements in {@link items} collection.
     * @param fromIndex index of element from which selection range begins.
     * @param toIndex index of element on which selection range ends.
     */
    public selectRange(fromIndex: number, toIndex: number): void {
        if (toIndex < 0 || this.items.length <= toIndex || fromIndex < 0 || this.items.length <= fromIndex) {
            return;
        }
        const startIndex = Math.min(fromIndex, toIndex);
        const endIndex = Math.max(fromIndex, toIndex);
        if (this.isRangeSelected(startIndex, endIndex)) {
            return;
        }
        this.deselectAll();
        const tempData = new Array<SelectionTuple>();
        for (let i = startIndex; i <= endIndex; i++) {
            const tuple = this.getSelectionTuple(i);
            tempData.push(tuple);
            this.processSelection(tuple, true);
        }
        this.selectionsList.splice(0, this.selectionsList.length, ...tempData);
        this.lastProcessedIndex = endIndex;
    }
    /**
     * Checks that at least one element selected in {@link items} collection.
     * @returns `true` if anything is selected.
     */
    public hasSelections(): boolean {
        return this.selectionsList.length !== 0;
    }
    /**
     * Checks that all elements inside specified range are selected in {@link items} collection.
     * @param fromIndex index of element from which check must be performed.
     * @param toIndex index of element to which check must be performed.
     * @returns `true` if all elements inside specified range are selected.
     */
    public isRangeSelected(from: number, to: number): boolean {
        // nothing selected
        if (this.selectionsList.length === 0) {
            return false;
        }
        // entire list selected
        if (from === 0 && to === this.items.length - 1 && this.selectionsList.length === this.items.length) {
            return true;
        }
        const orderedIndexes = this.selectionsList.map((tuple: SelectionTuple) => tuple.index).sort();
        return 1 + to - from === orderedIndexes.length && orderedIndexes[0] === from && orderedIndexes[orderedIndexes.length - 1] === to;
    }
    /**
     * Checks that element at specified index is selected.
     * @param index index of element in {@link items} collection to check.
     * @returns `true` if element is selected.
     */
    public isIndexSelected(index: number): boolean {
        if (this.selectionsList.length > 0 && this.isIndexAcceptable(index)) {
            return this.selectionsList.findIndex((st: SelectionTuple) => st.index === index) !== -1;
        }
        return false;
    }
    /**
     * Returns index of specified element in {@link items} collection.
     * @param item element to find.
     * @returns index of specified element in {@link items} collection. -1 if element not found.
     * @see {@link trackByFn}
     */
    public getItemIndex(item: any): number {
        return this.items.findIndex((value: any) => value === item);
    }
    /**
     * Returns index of first selected element from {@link items} collection.
     * @returns index of first selected element. -1 if nothing is selected.
     */
    public getMinSelectedIndex(): number {
        let minIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            minIndex = minIndex === -1 || item.index < minIndex ? item.index : minIndex;
        });
        return minIndex;
    }
    /**
     * Returns index of last selected element from {@link items} collection.
     * @returns index of last selected element. -1 if nothing is selected.
     */
    public getMaxSelectedIndex(): number {
        let maxIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            maxIndex = maxIndex === -1 || item.index > maxIndex ? item.index : maxIndex;
        });
        return maxIndex;
    }
    /**
     * Selects first element in {@link items} collection.
     */
    public selectFirst(): void {
        if (this.items.length > 0) {
            this.selectItem(this.getSelectionTuple(0));
        }
    }
    /**
     * Selects last element in {@link items} collection.
     */
    public selectLast(): void {
        if (this.items.length > 0) {
            this.selectItem(this.getSelectionTuple(this.items.length - 1));
        }
    }
    /**
     * Selects element at specified index in {@link items} collection.
     * @param index index of element in {@link items} collection.
     * @param savePrevious `true` if previously selected elements must stay selected after current selection.
     */
    public selectIndex(index: number, savePrevious: boolean = false): void {
        if (this.isIndexAcceptable(index)) {
            this.selectItem(this.getSelectionTuple(index), savePrevious);
        }
    }
    /**
     * Deselects element at specified index in {@link items} collection.
     * @param index index of element in {@link items} collection.
     */
    public deselectIndex(index: number): void {
        if (this.isIndexAcceptable(index)) {
            this.deselectItem(this.getSelectionTuple(index));
        }
    }
    /**
     * Toggles selection of element at the specified index.
     * @param index index of element in {@link items} collection.
     * @param savePrevious `true` if previously selected elements must stay selected after current selection.
     */
    public toggleSelection(index: number, savePrevious: boolean = false): void {
        if (!this.isIndexAcceptable(index)) {
            return;
        }
        const tuple = this.getSelectionTuple(index);
        if (this.isIndexSelected(index) && (this.selectionsList.length === 1 || (this.selectionsList.length > 1 && savePrevious))) {
            this.deselectItem(tuple);
            return;
        }
        this.selectItem(tuple, savePrevious);
    }
    /**
     * Returns all elements from {@link items} collection which are marked as selected.
     * @returns collection of selected elements.
     */
    public getSelectedElements(): any[] {
        return this.selectionsList.map((selectionTuple: SelectionTuple) => selectionTuple.item);
    }
    /**
     * Returns indexes of all elements from {@link items} collection which are marked as selected.
     * @returns collection of selected elements indexes in {@link items} collection.
     */
    public getSelectedIndexes(): number[] {
        return this.selectionsList.map((selectionTuple: SelectionTuple) => selectionTuple.index);
    }
    /**
     * Performs final processing of selection/deselection of element.
     */
    public processSelection(tuple: SelectionTuple, selected: boolean): void {
        if (Object.prototype.hasOwnProperty.call(tuple.item, 'selected')) {
            tuple.item.selected = selected;
        }
        const initialSelectState = this.eventEmitters[tuple.index] ? this.eventEmitters[tuple.index].selected || null : null;
        if (initialSelectState === null || initialSelectState !== selected) {
            if (this.eventEmitters.length > tuple.index && this.eventEmitters[tuple.index]) {
                this.emitEvents(this.eventEmitters[tuple.index], selected, tuple);
                this.eventEmitters[tuple.index].postProcessSelection(selected);
            }
            if (this.areaEventsEmitter) {
                this.emitEvents(this.areaEventsEmitter, selected, tuple);
            }
        }
    }
    /**
     * Default tracking function that will be used if nothing was specified for {@link trackByFn}.
     * Implements comparison by reference equality of objects.
     */
    private trackByIdentity: (index: number, item: any) => any = (index: number, item: any) => item;

    private deselectItem(selectionTuple: SelectionTuple): void {
        const index = this.selectionsList.findIndex((selectedItem: SelectionTuple) => selectedItem.item === selectionTuple.item);
        if (index !== -1) {
            this.selectionsList.splice(index, 1);
        }
        this.processSelection(selectionTuple, false);
        this.lastProcessedIndex = selectionTuple.index;
    }
    private selectItem(selectionTuple: SelectionTuple, savePrevious: boolean = false): void {
        if (savePrevious) {
            const index = this.selectionsList.findIndex((selectedItem: SelectionTuple) => selectedItem.item === selectionTuple.item);
            if (index !== -1) {
                this.selectionsList.splice(index, 1);
            }
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        } else {
            const list = this.selectionsList.splice(0, this.selectionsList.length);
            list.forEach((selectedItem: SelectionTuple) => {
                this.processSelection(selectedItem, false);
            });
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    }
    private getSelectionTuple(index: number): SelectionTuple {
        return {
            index,
            item: this.items[index]
        };
    }

    /**
     * Selects all elements in {@link items} collection.
     */
    public selectAll(recursive: boolean = true): void {
        this.selectRange(0, this.items.length - 1);
        // run this directly after render to give child selectionAreas ability to render
        setTimeout(() => {
            if (recursive && this.childSelectionServices) {
                this.childSelectionServices.forEach(service => {
                    service.selectAll(recursive);
                });
            }
        }, 0);
    }
    /**
     * Deselects all elements in {@link items} collection.
     */
    public deselectAll(recursive: boolean = true): void {
        if (recursive && this.childSelectionServices) {
            this.childSelectionServices.forEach(service => {
                service.deselectAll(recursive);
            });
        }
        const list = this.selectionsList.splice(0, this.selectionsList.length);
        for (const item of list) {
            this.processSelection(item, false);
        }
        this.lastProcessedIndex = null;
    }
    public emitEvents(emitter: SelectionEventsEmitter, selected: boolean, tuple: SelectionTuple): void {
        if (selected) {
            emitter.itemSelected.emit({ index: tuple.index, item: tuple.item });
        } else {
            emitter.itemDeselected.emit({ index: tuple.index, item: tuple.item });
        }
        emitter.selectionChanged.emit({ index: tuple.index, item: tuple.item });
    }
}
