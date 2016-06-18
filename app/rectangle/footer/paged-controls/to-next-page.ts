import {Renderer, Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef} from '@angular/core';
import {RtListComponent} from '../../lists/list';
import {GoToControlBase} from './go-to-control-base';

@Directive({
    selector: '[rt-to-next-page]'
})
export class RtToNextPageDirective extends GoToControlBase {
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        super(listHost, differs, elementRef, renderer);
    }

    @HostListener('click')
    goToNextPage(): void {
        this.pagedListService.goToNextPage();
    }

    @Input('rt-disabled-cls')
    disabledCls: string;

    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPagerChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal' || item.key === 'pageSizeInternal' || item.key === 'totalCount') {
            this.setDisabledState();
        }
    }
    isDisabled(): boolean {
        return this.pagedListService.pager.pageNumber === this.pagedListService.pager.pageCount;
    }
}
