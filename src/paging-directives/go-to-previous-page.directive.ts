import { Directive, ElementRef, HostBinding, HostListener, KeyValueDiffers } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtList } from '../core/list';
import { GoToControlBase } from './go-to-control-base';

@Directive({
    selector: '[rtGoToPreviousPage]'
})
export class GoToPreviousPageDirective extends GoToControlBase {
    constructor(private listService: RtList, pager: PagedPager, differs: KeyValueDiffers, elementRef: ElementRef) {
        super(pager, differs, elementRef);
    }
    @HostListener('click')
    public goToPreviousPage(): void {
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
