import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';

import { ListComponent } from '../list.component';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToLastPage]'
})
export class GoToLastPageDirective extends GoToControlBase {
    @Input() public disabledCls: string;
    constructor(listHost: ListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(renderer, listHost, differs, elementRef);
    }
    @HostListener('click')
    public goToLastPage(): void {
        this.pagedListService.goToLastPage();
    }
    @HostBinding('attr.disabled')
    public get disabled(): boolean {
        return this.innerDisabled;
    }
    protected checkPagerChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal' || item.key === 'pageSizeInternal' || item.key === 'totalCount') {
            this.setDisabledState();
        }
    }
    public isDisabled(): boolean {
        return this.pagedListService.pager.pageNumber === this.pagedListService.pager.pageCount;
    }
}
