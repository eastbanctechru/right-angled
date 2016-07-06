import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';
import { RtListComponent } from '../list-components/list.component';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rt-to-first-page]'
})
export class RtToFirstPageDirective extends GoToControlBase {
    @Input('disabled-cls')
    public disabledCls: string;

    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(listHost, differs, elementRef, renderer);
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
