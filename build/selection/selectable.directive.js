/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SkipSelf } from '@angular/core';
import { RTSelectionEventsHelper } from './providers/selection-events-helper';
var SelectableDirective = /** @class */ (function () {
    function SelectableDirective(selectionEventsHelper, renderer, el) {
        this.selectionEventsHelper = selectionEventsHelper;
        this.renderer = renderer;
        this.el = el;
        this.index = null;
        /* tslint:disable-next-line:no-input-rename */
        this.item = null;
        this.selectedChange = new EventEmitter();
        this.itemSelected = new EventEmitter();
        this.itemDeselected = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.selectedInternal = false;
    }
    Object.defineProperty(SelectableDirective.prototype, "selected", {
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
                this.selectionEventsHelper.selectionService.selectIndex(this.index, this.selectionEventsHelper.multiple);
            }
            else {
                this.selectionEventsHelper.selectionService.deselectIndex(this.index);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} ctrlKeyPressed
     * @param {?} shiftKeyPressed
     * @param {?} mouseButton
     * @param {?} preventDefaultFn
     * @param {?} stopPropagationFn
     * @param {?} executionContext
     * @return {?}
     */
    SelectableDirective.prototype.mouseUpHandler = /**
     * @param {?} ctrlKeyPressed
     * @param {?} shiftKeyPressed
     * @param {?} mouseButton
     * @param {?} preventDefaultFn
     * @param {?} stopPropagationFn
     * @param {?} executionContext
     * @return {?}
     */
    function (ctrlKeyPressed, shiftKeyPressed, mouseButton, preventDefaultFn, stopPropagationFn, executionContext) {
        if (this.selectionEventsHelper.mouseHandler(ctrlKeyPressed, shiftKeyPressed, mouseButton, this.index)) {
            this.clearWindowSelection();
            if (this.selectionEventsHelper.preventEventsDefaults && preventDefaultFn) {
                preventDefaultFn.call(executionContext);
            }
            if (this.selectionEventsHelper.stopEventsPropagation && stopPropagationFn) {
                stopPropagationFn.call(executionContext);
            }
        }
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    SelectableDirective.prototype.postProcessSelection = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected === this.selected) {
            return;
        }
        this.selectedInternal = selected;
        this.selectedChange.emit(this.selectedInternal);
        if (SelectableDirective.settings.selectedClassName) {
            if (this.selected) {
                this.renderer.addClass(this.el.nativeElement, SelectableDirective.settings.selectedClassName);
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, SelectableDirective.settings.selectedClassName);
            }
        }
    };
    /**
     * @return {?}
     */
    SelectableDirective.prototype.clearWindowSelection = /**
     * @return {?}
     */
    function () {
        try {
            window.getSelection().removeAllRanges();
        }
        catch (e) {
            // do nothing
        }
    };
    SelectableDirective.settings = {
        selectedClassName: 'rt-selected'
    };
    SelectableDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'rtSelectable',
                    selector: '[rtSelectable]'
                },] },
    ];
    /** @nocollapse */
    SelectableDirective.ctorParameters = function () { return [
        { type: RTSelectionEventsHelper, decorators: [{ type: SkipSelf }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    SelectableDirective.propDecorators = {
        item: [{ type: Input, args: ['rtSelectable',] }],
        selectedChange: [{ type: Output }],
        itemSelected: [{ type: Output }],
        itemDeselected: [{ type: Output }],
        selectionChanged: [{ type: Output }],
        selected: [{ type: Input }],
        mouseUpHandler: [{ type: HostListener, args: ['mouseup', [
                        '$event.ctrlKey',
                        '$event.shiftKey',
                        '$event.which',
                        '$event.preventDefault',
                        '$event.stopPropagation',
                        '$event'
                    ],] }]
    };
    return SelectableDirective;
}());
export { SelectableDirective };
if (false) {
    /** @type {?} */
    SelectableDirective.settings;
    /** @type {?} */
    SelectableDirective.prototype.index;
    /** @type {?} */
    SelectableDirective.prototype.item;
    /** @type {?} */
    SelectableDirective.prototype.selectedChange;
    /** @type {?} */
    SelectableDirective.prototype.itemSelected;
    /** @type {?} */
    SelectableDirective.prototype.itemDeselected;
    /** @type {?} */
    SelectableDirective.prototype.selectionChanged;
    /**
     * @type {?}
     * @private
     */
    SelectableDirective.prototype.selectedInternal;
    /** @type {?} */
    SelectableDirective.prototype.selectionEventsHelper;
    /**
     * @type {?}
     * @private
     */
    SelectableDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    SelectableDirective.prototype.el;
}
