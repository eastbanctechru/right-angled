import {Directive, HostListener, HostBinding, KeyValueDiffers, Input, ElementRef} from '@angular/core';
import {RtList} from '../../lists/list';
import {GoToControlBase} from './go-to-control-base';

@Directive({
    selector: '[rt-to-last-page]'
})
export class RtToLastPage extends GoToControlBase {
    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef) {
        super(listHost, differs, elementRef);
    }

    @HostListener('click')
    goToLastPage(): void {
        this.pagedListService.goToLastPage();
    }

    @Input('rt-disabled-cls')
    disabledCls: string;

    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPagerChanged(item: any): void {
        super.checkPagerChanged(item);
        if (item.key === 'pageSizeInternal' || item.key === 'totalCount') {
            this.setDisabledState();
        }
    }
    isDisabled(): boolean {
        return this.pagedListService.pager.pageNumber === this.pagedListService.pager.pageCount;
    }
}
