import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';

import { ListComponent } from '../list.component';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToPrevPage]'
})
export class GoToPrevPageDirective extends GoToControlBase {
    @Input() public disabledCls: string;
    constructor(listHost: ListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
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
