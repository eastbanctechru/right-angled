/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { RTList } from '../providers/list';
var InfiniteDirective = /** @class */ (function () {
    function InfiniteDirective(elementRef, bufferedPager, list, renderer) {
        this.elementRef = elementRef;
        this.bufferedPager = bufferedPager;
        this.list = list;
        this.renderer = renderer;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    InfiniteDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (this.scrollListener) {
            this.scrollListener();
        }
        if (changes.targetElement && changes.targetElement.currentValue) {
            this.scrollListener = this.renderer.listen(this.targetElement, 'scroll', function () {
                if (_this.list.busy || false === _this.bufferedPager.canLoadMore) {
                    return;
                }
                /** @type {?} */
                var targetTop = _this.targetElement.getBoundingClientRect().top;
                /** @type {?} */
                var targetHeight = _this.targetElement.clientHeight;
                /** @type {?} */
                var elementPosition = ((/** @type {?} */ (_this.elementRef.nativeElement))).getBoundingClientRect().top;
                if (targetTop + targetHeight >= elementPosition) {
                    _this.list.loadData();
                }
            });
        }
        else {
            this.scrollListener = this.renderer.listen('window', 'scroll', function () {
                if (_this.list.busy || false === _this.bufferedPager.canLoadMore) {
                    return;
                }
                /** @type {?} */
                var windowHeight = document.documentElement.clientHeight;
                /** @type {?} */
                var elementPosition = ((/** @type {?} */ (_this.elementRef.nativeElement))).getBoundingClientRect().top;
                if (elementPosition - windowHeight <= 0) {
                    _this.list.loadData();
                }
            });
        }
    };
    /**
     * @return {?}
     */
    InfiniteDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.scrollListener();
    };
    InfiniteDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rtInfinite]'
                },] },
    ];
    /** @nocollapse */
    InfiniteDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: BufferedPager },
        { type: RTList },
        { type: Renderer2 }
    ]; };
    InfiniteDirective.propDecorators = {
        targetElement: [{ type: Input, args: ['rtInfinite',] }]
    };
    return InfiniteDirective;
}());
export { InfiniteDirective };
if (false) {
    /** @type {?} */
    InfiniteDirective.prototype.targetElement;
    /** @type {?} */
    InfiniteDirective.prototype.scrollListener;
    /**
     * @type {?}
     * @private
     */
    InfiniteDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    InfiniteDirective.prototype.bufferedPager;
    /**
     * @type {?}
     * @private
     */
    InfiniteDirective.prototype.list;
    /**
     * @type {?}
     * @private
     */
    InfiniteDirective.prototype.renderer;
}
