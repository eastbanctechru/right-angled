import {Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef} from '@angular/core';
import {RtListComponent} from '../../lists/list';
import {GoToControlBase} from './go-to-control-base';

@Directive({
    selector: '[rt-to-prev-page]'
})
export class RtToPrevPageDirective extends GoToControlBase {
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(listHost, differs, elementRef, renderer);
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
