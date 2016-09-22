import { Directive, HostBinding, HostListener, KeyValueDiffers } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtListService } from '../list-service';
import { PageSizeControlBase } from './page-size-control-base';

@Directive({
    selector: 'input[rtPageSize]'
})
export class PageSizeDirective extends PageSizeControlBase {
    @HostBinding('value')
    public innerValue: number;
    public get pageSizePropertyName(): string {
        return 'pageSizeInternal';
    }
    constructor(listService: RtListService, pager: PagedPager, differs: KeyValueDiffers) {
        super(listService, pager, differs);
        if (pager === null) {
            throw new Error('[rtPageSize] directive can be used only with paged list provider.');
        }
    }
    @HostListener('keyup.enter')
    public onEnter(): void {
        super.onComplete();
    }

    @HostListener('input', ['$event.target.value'])
    public inputHandler(value: any): void {
        super.setPageSize(value);
    }

    @HostListener('blur')
    public blurHandler(): void {
        super.restoreInputValue();
    }
}
