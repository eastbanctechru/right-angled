import { Directive, ElementRef, HostBinding, HostListener, KeyValueDiffers } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtList } from '../core/list';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToLastPage]'
})
export class GoToLastPageDirective extends GoToControlBase {
    constructor(private listService: RtList, pager: PagedPager, differs: KeyValueDiffers, elementRef: ElementRef) {
        super(pager, differs, elementRef);
    }
    @HostListener('click')
    public goToLastPage(): void {
        if (this.pager.tryMoveToLastPage()) {
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
