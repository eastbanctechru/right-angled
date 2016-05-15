import {Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef} from '@angular/core';
import {RtList} from '../../lists/list';
import {GoToControlBase} from './go-to-control-base';

@Directive({
    selector: '[rt-to-prev-page]'
})
export class RtToPrevPage extends GoToControlBase {
    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef) {
        super(listHost, differs, elementRef);
    }
    @HostListener('click')
    goToPrevPage(): void {
        this.pagedListService.goToPreviousPage();
    }

    @Input('rt-disabled-cls')
    disabledCls: string;

    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    isDisabled(): boolean {
        return this.pagedListService.pager.pageNumber === 1;
    }
}
