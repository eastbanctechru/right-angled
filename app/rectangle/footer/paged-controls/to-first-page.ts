import {Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef} from '@angular/core';
import {RtList} from '../../lists/list';
import {GoToControlBase} from './go-to-control-base';

@Directive({
    selector: '[rt-to-first-page]'
})
export class RtToFirstPage extends GoToControlBase {
    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(listHost, differs, elementRef, renderer);
    }
    @HostListener('click')
    goToFirstPage(): void {
        this.pagedListService.goToFirstPage();
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
