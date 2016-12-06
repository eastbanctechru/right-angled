import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffers, OnInit } from '@angular/core';
import { PagedPager } from 'e2e4';

import { PagerInputBase } from './pager-input-base';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'input[rtPageSize]'
})
export class PageSizeDirective extends PagerInputBase implements DoCheck, OnInit {
    @HostBinding('value')
    public innerValue: number;
    public get value(): number {
        return this.pager.pageSize;
    }
    public set value(value: number) {
        this.pager.pageSize = value;
    }
    constructor(pager: PagedPager, differs: KeyValueDiffers) {
        super(pager, differs, 'pageSizeInternal');
    }

    @HostListener('input', ['$event.target.value'])
    public inputHandler(value: any): void {
        super.setPageSize(value);
    }

    @HostListener('blur')
    public blurHandler(): void {
        super.restoreInputValue();
    }
    public ngOnInit(): void {
        super.ngOnInit();
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
    }
}
