import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffers, OnInit } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtList } from '../core/list';
import { PageSizeControlBase } from './page-size-control-base';

@Directive({
    /* tslint:disable-next-line:directive-selector-name directive-selector-type directive-selector-prefix */
    selector: 'input[rtPageSize]'
})
export class PageSizeDirective extends PageSizeControlBase implements DoCheck, OnInit {
    @HostBinding('value')
    public innerValue: number;
    public get pageSize(): number {
        return this.pager.pageSize;
    }
    public set pageSize(value: number) {
        this.pager.pageSize = value;
    }
    public get checkChangesPropertyName(): string {
        return 'pageSizeInternal';
    }
    constructor(listService: RtList, pager: PagedPager, differs: KeyValueDiffers) {
        super(listService, pager, differs);
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
    public ngOnInit(): void {
        super.ngOnInit();
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
    }
}
