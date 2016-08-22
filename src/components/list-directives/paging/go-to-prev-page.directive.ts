import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';
import { PagedPager } from 'e2e4';
import { RtListService } from '../list-service';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToPrevPage]'
})
export class GoToPrevPageDirective extends GoToControlBase {
    @Input() public disabledCls: string;
    constructor(private listService: RtListService, pager: PagedPager, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(renderer, pager, differs, elementRef);
    }
    @HostListener('click')
    public goToPrevPage(): void {
        if (this.pager.tryMoveToPreviousPage()) {
            this.listService.loadData();
        }
    }
    @HostBinding('attr.disabled')
    public get disabled(): boolean {
        return this.innerDisabled;
    }
    public isDisabled(): boolean {
        return this.pager.pageNumber === 1;
    }
}
