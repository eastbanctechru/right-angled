import { Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef } from '@angular/core';
import { RtListComponent } from '../../lists/list';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rt-to-last-page]'
})
export class RtToLastPageDirective extends GoToControlBase {
    @Input('disabled-cls')
    public disabledCls: string;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(listHost, differs, elementRef, renderer);
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
