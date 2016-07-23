import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';

import { RtListService } from '../../services/rt-list-service.service';
import { RtPagedPager } from '../../services/injectables';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToNextPage]'
})
export class GoToNextPageDirective extends GoToControlBase {
    @Input() public disabledCls: string;
    constructor(private listService: RtListService, pager: RtPagedPager, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(renderer, pager, differs, elementRef);
    }
    @HostListener('click')
    public goToNextPage(): void {
        if (this.pager.tryMoveToNextPage()) {
            this.listService.loadData();
        }
    }
    @HostBinding('attr.disabled')
    public get disabled(): boolean {
        return this.innerDisabled;
    }
    public isDisabled(): boolean {
        return this.pager.pageNumber === this.pager.pageCount;
    }
}
