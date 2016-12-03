import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffers, OnInit } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtList } from '../core/providers';
import { PagerInputBase } from './pager-input-base';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'input[rtPageNumber]'
})
export class PageNumberDirective extends PagerInputBase implements DoCheck, OnInit {
    @HostBinding('value')
    public innerValue: number;

    public get value(): number {
        return this.pager.pageNumber;
    }
    public set value(value: number) {
        this.pager.pageNumber = value;
    }

    constructor(listService: RtList, pager: PagedPager, differs: KeyValueDiffers) {
        super(listService, pager, differs, 'pageNumberInternal');
    }

    @HostListener('keyup.enter')
    public onEnter(): void {
        super.onComplete();
    }

    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        super.setPageSize(value);
    }

    @HostListener('blur')
    public restoreInputValue(): void {
        super.restoreInputValue();
    }
    public ngOnInit(): void {
        super.ngOnInit();
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
    }
}
