import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';
import { RtListComponent } from '../../lists/list.component';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rt-to-prev-page]'
})
export class RtToPrevPageDirective extends GoToControlBase {
    @Input('disabled-cls')
    public disabledCls: string;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(listHost, differs, elementRef, renderer);
    }
    @HostListener('click')
    public goToPrevPage(): void {
        this.pagedListService.goToPreviousPage();
    }
    @HostBinding('attr.disabled')
    public get disabled(): boolean {
        return this.innerDisabled;
    }
    public isDisabled(): boolean {
        return this.pagedListService.pager.pageNumber === 1;
    }
}
