/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, Self } from '@angular/core';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection-service';
import { SelectableDirective } from './selectable.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';
var SelectionAreaDirective = /** @class */ (function () {
    function SelectionAreaDirective(selectionService, selectionEventsHelper) {
        this.selectionService = selectionService;
        this.selectionEventsHelper = selectionEventsHelper;
        this.tabIndex = 0;
        this.autoSelectFirst = false;
        this.itemSelected = new EventEmitter();
        this.itemDeselected = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.selectionService.areaEventsEmitter = this;
        this.selectionEventsHelper = selectionEventsHelper;
    }
    Object.defineProperty(SelectionAreaDirective.prototype, "preventEventsDefaults", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selectionEventsHelper.preventEventsDefaults = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionAreaDirective.prototype, "stopEventsPropagation", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selectionEventsHelper.stopEventsPropagation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionAreaDirective.prototype, "horizontal", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selectionEventsHelper.horizontal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionAreaDirective.prototype, "multiple", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selectionEventsHelper.multiple = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionAreaDirective.prototype, "toggleOnly", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selectionEventsHelper.toggleOnly = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionAreaDirective.prototype, "trackBy", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value !== 'function') {
                throw new Error('trackBy parameter value must be a function');
            }
            this.selectionService.trackByFn = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionAreaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.itemsSubscription.unsubscribe();
        this.checkboxesSubscription.unsubscribe();
        this.childSelectionAreasSubscription.unsubscribe();
        this.selectionService.deselectAll();
        this.selectionService.destroy();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectionAreaDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (false === this.selectionService.hasSelections() &&
            changes.autoSelectFirst &&
            changes.autoSelectFirst.currentValue === true) {
            this.selectionService.selectIndex(0, false);
        }
        if (changes.multiple && changes.multiple.currentValue === false) {
            /** @type {?} */
            var selectedIndexes = this.selectionService.getSelectedIndexes();
            if (selectedIndexes.length > 1) {
                selectedIndexes.splice(0, 1);
                selectedIndexes.forEach(function (index) {
                    _this.selectionService.deselectIndex(index);
                });
            }
        }
    };
    /**
     * @param {?} ctrlKeyPressed
     * @param {?} shiftKeyPressed
     * @param {?} keyCode
     * @param {?} preventDefaultFn
     * @param {?} stopPropagationFn
     * @param {?} executionContext
     * @return {?}
     */
    SelectionAreaDirective.prototype.keyDownHandler = /**
     * @param {?} ctrlKeyPressed
     * @param {?} shiftKeyPressed
     * @param {?} keyCode
     * @param {?} preventDefaultFn
     * @param {?} stopPropagationFn
     * @param {?} executionContext
     * @return {?}
     */
    function (ctrlKeyPressed, shiftKeyPressed, keyCode, preventDefaultFn, stopPropagationFn, executionContext) {
        if (this.selectionEventsHelper.keyboardHandler(ctrlKeyPressed, shiftKeyPressed, keyCode)) {
            if (this.selectionEventsHelper.preventEventsDefaults && preventDefaultFn) {
                preventDefaultFn.call(executionContext);
            }
            if (this.selectionEventsHelper.stopEventsPropagation && stopPropagationFn) {
                stopPropagationFn.call(executionContext);
            }
        }
    };
    /**
     * @return {?}
     */
    SelectionAreaDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    SelectionAreaDirective.prototype.buildSelectionSource = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        /** @type {?} */
        var index = 0;
        this.selectionService.eventEmitters = items.map(function (item) {
            item.index = index++;
            return item;
        });
        this.selectionService.items = items.map(function (item) { return item.item; });
        if (this.selectionService.items.length > 0) {
            setTimeout(function () {
                // since we've modify collection on first render, to prevent error 'Expression has changed after it was checked' we've do selection after render
                if (_this.selectionService.items.length > 0) {
                    _this.selectionService.checkSelection();
                    // repeats first element selection since checking can deselect all elements
                    if (false === _this.selectionService.hasSelections() && _this.autoSelectFirst) {
                        _this.selectionService.selectIndex(0, false);
                    }
                }
            }, 0);
        }
    };
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    SelectionAreaDirective.prototype.buildSelectionServicesList = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        this.selectionService.childSelectionServices = items
            .filter(function (area) { return area !== _this; })
            .map(function (area) { return area.selectionService; });
    };
    SelectionAreaDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'rtSelectionArea',
                    providers: [RTSelectionService, RTSelectionEventsHelper],
                    selector: '[rtSelectionArea]'
                },] },
    ];
    /** @nocollapse */
    SelectionAreaDirective.ctorParameters = function () { return [
        { type: RTSelectionService, decorators: [{ type: Self }] },
        { type: RTSelectionEventsHelper, decorators: [{ type: Self }] }
    ]; };
    SelectionAreaDirective.propDecorators = {
        selectableItems: [{ type: ContentChildren, args: [SelectableDirective, { descendants: false },] }],
        childSelectionCheckboxes: [{ type: ContentChildren, args: [SelectionCheckboxForDirective, { descendants: false },] }],
        childSelectionAreas: [{ type: ContentChildren, args: [SelectionAreaDirective, { descendants: false },] }],
        tabIndex: [{ type: HostBinding, args: ['tabIndex',] }],
        preventEventsDefaults: [{ type: Input }],
        stopEventsPropagation: [{ type: Input }],
        horizontal: [{ type: Input }],
        multiple: [{ type: Input }],
        toggleOnly: [{ type: Input }],
        autoSelectFirst: [{ type: Input }],
        trackBy: [{ type: Input }],
        itemSelected: [{ type: Output }],
        itemDeselected: [{ type: Output }],
        selectionChanged: [{ type: Output }],
        keyDownHandler: [{ type: HostListener, args: ['keydown', [
                        '$event.ctrlKey',
                        '$event.shiftKey',
                        '$event.keyCode',
                        '$event.preventDefault',
                        '$event.stopPropagation',
                        '$event'
                    ],] }]
    };
    return SelectionAreaDirective;
}());
export { SelectionAreaDirective };
if (false) {
    /** @type {?} */
    SelectionAreaDirective.prototype.selectableItems;
    /** @type {?} */
    SelectionAreaDirective.prototype.childSelectionCheckboxes;
    /** @type {?} */
    SelectionAreaDirective.prototype.childSelectionAreas;
    /** @type {?} */
    SelectionAreaDirective.prototype.itemsSubscription;
    /** @type {?} */
    SelectionAreaDirective.prototype.checkboxesSubscription;
    /** @type {?} */
    SelectionAreaDirective.prototype.childSelectionAreasSubscription;
    /** @type {?} */
    SelectionAreaDirective.prototype.tabIndex;
    /** @type {?} */
    SelectionAreaDirective.prototype.autoSelectFirst;
    /** @type {?} */
    SelectionAreaDirective.prototype.itemSelected;
    /** @type {?} */
    SelectionAreaDirective.prototype.itemDeselected;
    /** @type {?} */
    SelectionAreaDirective.prototype.selectionChanged;
    /** @type {?} */
    SelectionAreaDirective.prototype.selectionService;
    /** @type {?} */
    SelectionAreaDirective.prototype.selectionEventsHelper;
}
