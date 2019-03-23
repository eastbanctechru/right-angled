import { Injectable } from '@angular/core';
import { RTSelectionService } from './selection.service';
/**
 * Used by {@link SelectionEventsHelper} to determine which key was pressed on keyboard.
 */
export enum KeyCodes {
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Esc = 27,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40,
    A = 65
}

/**
 * Used by {@link SelectionEventsHelper} to determine which mouse button is pressed.
 */
export enum MouseButtons {
    None = 0,
    Left = 1,
    Middle = 2,
    Right = 3
}
/**
 * Helper class that can be used by application-defined UI components for handling keyboard and mouse interaction with component.
 *
 * Implements selection model that is similar to Excel or Google Sheets. Concrete handled patterns you can see in concrete methods documentation.
 *
 * This implementation doesn't use any browser specific objects such as events and doesn't use any browser API.
 */
@Injectable()
export class RTSelectionEventsHelper {
    public preventEventsDefaults = true;
    public stopEventsPropagation = true;
    /**
     * `true` for shifting to next/previous item in list of items by `Left Arrow`/`Right Arrow` keys instead of `Arrow Up`/`Arrow Down` keys.
     */
    public horizontal: boolean;
    /**
     * `true` to make possible to pick several items in list of items (by clicking range of items with pressed `Shift` key, for example).
     */
    public multiple: boolean;
    /**
     * If `true`, then next item selection doesn't clear selection of previously selected items. The only way to clean selection is second click on previously selected element.
     * This can be used to implement accordion-like behavior in application-defined UI component.
     */
    public toggleOnly: boolean;
    /**
     * Instance of {@link RTSelectionService} to perform actual selection.
     */
    public selectionService: RTSelectionService;

    /**
     * @param selectionConfig Used for declarative interaction with application-defined UI component and access to it's selection settings
     * as well as {@link RTSelectionService} implementation, that was configured on it.
     */
    constructor(selectionService: RTSelectionService) {
        this.selectionService = selectionService;
        this.multiple = true;
    }
    /**
     * Common handler for keyboard events. Depending on specified parameters calls {@link onNextKey}, {@link onPreviousKey}, {@link trySelectPreviousItem}, {@link trySelectNextItem} or {@link trySelectAll} handler.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @param keyCode - specifies code of key that was pressed. This method can handle next keys: {@link KeyCodes.ArrowUp}, {@link KeyCodes.ArrowLeft}, {@link KeyCodes.ArrowDown}, {@link KeyCodes.ArrowRight},
     * {@link KeyCodes.Tab} and {@link KeyCodes.A}.
     * @returns `true` if any of executed commands was applied.
     */
    // tslint:disable-next-line:cyclomatic-complexity
    public keyboardHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, keyCode: KeyCodes): boolean {
        switch (keyCode) {
            case KeyCodes.ArrowUp:
                return !this.horizontal && this.onPreviousKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowLeft:
                return this.horizontal && this.onPreviousKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowDown:
                return !this.horizontal && this.onNextKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowRight:
                return this.horizontal && this.onNextKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.Tab:
                return ctrlKeyPressed ? false : shiftKeyPressed ? this.trySelectPreviousItem(false) : this.trySelectNextItem(false);
            case KeyCodes.A:
                return this.trySelectAll(ctrlKeyPressed, shiftKeyPressed);
            default:
                return false;
        }
    }
    /**
     * Common handler for mouse events.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @param mouseButton specifies which mouse button was pressed.
     * @param itemIndex index of clicked element in {@link RTSelectionService.items} collection.
     * @returns `true` if any of executed commands was applied.
     */
    public mouseHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: MouseButtons, itemIndex: number): boolean {
        const isItemSelected = this.selectionService.isIndexSelected(itemIndex);
        if (isItemSelected !== false && mouseButton !== MouseButtons.Left) {
            return false;
        }
        if (shiftKeyPressed && this.multiple) {
            const minIndex = this.selectionService.getMinSelectedIndex();
            this.selectionService.selectRange(minIndex === -1 ? itemIndex : minIndex, itemIndex);
        } else {
            const multiple = (ctrlKeyPressed || this.toggleOnly) && this.multiple;
            this.selectionService.toggleSelection(itemIndex, multiple);
        }
        return true;
    }
    /**
     * Tries to select all items if `Ctrl+A` combination was pressed.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed (with pressed `Shift` this command would not be applied).
     * @returns `true` if command was applied.
     */
    public trySelectAll(ctrlPressed: boolean, shiftPressed: boolean): boolean {
        if (ctrlPressed && !shiftPressed && this.multiple) {
            this.selectionService.selectAll();
            return true;
        }
        return false;
    }
    /**
     * Tries to select previous item when `Arrow Up` was pressed (`Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`).
     *
     * If `Shift` was pressed and {@link SelectionAreaConfig.multiple} is 'true' then elements selected before stays selected.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public trySelectPreviousItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionService.lastProcessedIndex > 0) {
            this.selectionService.selectIndex(this.selectionService.lastProcessedIndex - 1, shiftKeyPressed && this.multiple);
            return true;
        }
        return false;
    }
    /**
     * Tries to select next item when `Arrow Down` was pressed (`Right Arrow` if {@link SelectionAreaConfig.horizontal} is `true`).
     *
     * If `Shift` was pressed and {@link SelectionAreaConfig.multiple} is 'true' then elements selected before stays selected.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public trySelectNextItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionService.lastProcessedIndex < this.selectionService.items.length - 1) {
            this.selectionService.selectIndex(this.selectionService.lastProcessedIndex + 1, shiftKeyPressed && this.multiple);
            return true;
        }
        return false;
    }
    /**
     * Tries to deselect last selected element when `Shift+Arrow Up` combination pressed (`Shift+Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`).
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public tryDeselectLastItemInRange(shiftKeyPressed: boolean): boolean {
        if (this.selectionService.lastProcessedIndex > 0 && shiftKeyPressed) {
            if (this.selectionService.isIndexSelected(this.selectionService.lastProcessedIndex - 1)) {
                this.selectionService.deselectIndex(this.selectionService.lastProcessedIndex);
                this.selectionService.lastProcessedIndex = this.selectionService.lastProcessedIndex - 1;
                return true;
            }
        }
        return false;
    }
    /**
     * Tries to deselect last selected element when `Shift+Arrow Down` combination pressed (`Shift+Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`).
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public tryDeselectLastItemInReversedRange(shiftKeyPressed: boolean): boolean {
        if (this.selectionService.lastProcessedIndex < this.selectionService.items.length && shiftKeyPressed) {
            if (this.selectionService.isIndexSelected(this.selectionService.lastProcessedIndex + 1)) {
                this.selectionService.deselectIndex(this.selectionService.lastProcessedIndex);
                this.selectionService.lastProcessedIndex = this.selectionService.lastProcessedIndex + 1;
                return true;
            }
        }
        return false;
    }
    /**
     * Tries to select element that is previous to the last processed element and last processed element was deselected.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public tryBuildRangeWithPreviousItemWhenLastItemWasDeselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionService.isIndexSelected(this.selectionService.lastProcessedIndex)) {
            this.selectionService.selectRange(this.selectionService.lastProcessedIndex, this.selectionService.lastProcessedIndex - 1);
            return true;
        }
        return false;
    }
    /**
     * Tries to select element that is next to the last processed element and last processed element was deselected.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public tryBuildRangeWithNextItemWhenLastItemWasDeselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionService.isIndexSelected(this.selectionService.lastProcessedIndex)) {
            this.selectionService.selectRange(this.selectionService.lastProcessedIndex, this.selectionService.lastProcessedIndex + 1);
            return true;
        }
        return false;
    }
    /**
     * Selects first element in {@link RTSelectionService.items} if nothing was selected before.
     * @returns `true` if command was applied.
     */
    public tryInitialSelectionOfFirstItem(): boolean {
        if (this.selectionService.lastProcessedIndex === null) {
            this.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    /**
     * Tries to select all elements starting from last selected element up to first element in {@link RTSelectionService.items} when `Ctrl+Shift+Arrow Up` combination was pressed
     * (`Ctrl+Shift+Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`).
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public trySelectAllItemsUpToFirst(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.multiple) {
            this.selectionService.selectRange(this.selectionService.lastProcessedIndex, 0);
            return true;
        }
        return false;
    }
    /**
     * Tries to select all elements starting from last selected element up to last element in {@link RTSelectionService.items} when `Ctrl+Shift+Arrow Down` combination was pressed
     * (`Ctrl+Shift+Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`).
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    public trySelectAllItemsUpToLast(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.multiple) {
            this.selectionService.selectRange(this.selectionService.lastProcessedIndex, this.selectionService.items.length - 1);
            return true;
        }
        return false;
    }
    /**
     * Tries to select first element in {@link RTSelectionService.items} when `Ctrl+Arrow Up` combination was pressed (`Ctrl+Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`).
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed (with pressed `Shift` this command would not be applied).
     * @returns `true` if command was applied.
     */
    public trySelectFirstItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    /**
     * Tries to select last element in {@link RTSelectionService.items} when `Ctrl+Arrow Down` combination was pressed (`Ctrl+Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`).
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed (with pressed `Shift` this command would not be applied).
     * @returns `true` if command was applied.
     */
    public trySelectLastItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionService.selectLast();
            return true;
        }
        return false;
    }
    /**
     * Common handler for `Arrow Up` key (`Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`). Calls applicable handlers one by one until any returns `true`.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if any of executed commands was applied.
     */
    public onPreviousKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return (
            this.tryInitialSelectionOfFirstItem() ||
            this.trySelectFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToFirst(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithPreviousItemWhenLastItemWasDeselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInRange(shiftKeyPressed) ||
            this.trySelectPreviousItem(shiftKeyPressed)
        );
    }
    /**
     * Common handler for `Arrow Down` key (`Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`). Calls applicable handlers one by one until any returns `true`.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if any of executed commands was applied.
     */
    public onNextKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return (
            this.tryInitialSelectionOfFirstItem() ||
            this.trySelectLastItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToLast(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithNextItemWhenLastItemWasDeselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInReversedRange(shiftKeyPressed) ||
            this.trySelectNextItem(shiftKeyPressed)
        );
    }
}
