import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';

import { ListComponent } from '../list.component';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToFirstPage]'
})
export class GoToFirstPageDirective extends GoToControlBase {
    @Input() public disabledCls: string;

    constructor(listHost: ListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(renderer, listHost, differs, elementRef);
    }
    @HostListener('click')
    public goToFirstPage(): void {
        this.pagedListService.goToFirstPage();
    }
    @HostBinding('attr.disabled')
    public get disabled(): boolean {
        return this.innerDisabled;
    }
    public isDisabled(): boolean {
        return this.pagedListService.pager.pageNumber === 1;
    }
}
