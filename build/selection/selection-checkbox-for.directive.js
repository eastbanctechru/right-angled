/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output, SkipSelf } from '@angular/core';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
import { RTSelectionService } from './providers/selection-service';
var SelectionCheckboxForDirective = /** @class */ (function () {
    function SelectionCheckboxForDirective(selectionEventsHelper, selectionService) {
        this.selectionEventsHelper = selectionEventsHelper;
        this.selectionService = selectionService;
        this.index = null;
        /* tslint:disable-next-line:no-input-rename */
        this.item = null;
        this.selectedChange = new EventEmitter();
        this.itemSelected = new EventEmitter();
        this.itemDeselected = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.selectedInternal = false;
    }
    Object.defineProperty(SelectionCheckboxForDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectedInternal;
        },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            if (selected) {
                this.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
            }
            else {
                this.selectionService.deselectIndex(this.index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCheckboxForDirective.prototype, "isChecked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectionService.isIndexSelected(this.index);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} isChecked
     * @return {?}
     */
    SelectionCheckboxForDirective.prototype.changeHandler = /**
     * @param {?} isChecked
     * @return {?}
     */
    function (isChecked) {
        if (isChecked) {
            this.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
        }
        else {
            this.selectionService.deselectIndex(this.index);
        }
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    SelectionCheckboxForDirective.prototype.postProcessSelection = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected === this.selected) {
            return;
        }
        this.selectedInternal = selected;
        this.selectedChange.emit(this.selectedInternal);
    };
    SelectionCheckboxForDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'rtSelectionCheckboxFor',
                    /* tslint:disable-next-line:directive-selector */
                    selector: 'input[rtSelectionCheckboxFor]'
                },] },
    ];
    /** @nocollapse */
    SelectionCheckboxForDirective.ctorParameters = function () { return [
        { type: RTSelectionEventsHelper, decorators: [{ type: SkipSelf }] },
        { type: RTSelectionService, decorators: [{ type: SkipSelf }] }
    ]; };
    SelectionCheckboxForDirective.propDecorators = {
        item: [{ type: Input, args: ['rtSelectionCheckboxFor',] }],
        selected: [{ type: Input }],
        selectedChange: [{ type: Output }],
        itemSelected: [{ type: Output }],
        itemDeselected: [{ type: Output }],
        selectionChanged: [{ type: Output }],
        isChecked: [{ type: HostBinding, args: ['checked',] }],
        changeHandler: [{ type: HostListener, args: ['change', ['$event.target.checked'],] }]
    };
    return SelectionCheckboxForDirective;
}());
export { SelectionCheckboxForDirective };
if (false) {
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.index;
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.item;
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.selectedChange;
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.itemSelected;
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.itemDeselected;
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.selectionChanged;
    /**
     * @type {?}
     * @private
     */
    SelectionCheckboxForDirective.prototype.selectedInternal;
    /** @type {?} */
    SelectionCheckboxForDirective.prototype.selectionEventsHelper;
    /**
     * @type {?}
     * @private
     */
    SelectionCheckboxForDirective.prototype.selectionService;
}
