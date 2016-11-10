import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffers, OnInit } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RtList } from '../core/list';
import { PagerInputBase } from './pager-input-base';

@Directive({
    /* tslint:disable-next-line:directive-selector-name directive-selector-type directive-selector-prefix */
    selector: 'input[rtRowCount]'
})
export class RowCountDirective extends PagerInputBase implements DoCheck, OnInit {
    @HostBinding('value')
    public innerValue: number;
    public get value(): number {
        return this.pager.takeRowCount;
    }
    public set value(value: number) {
        this.pager.takeRowCount = value;
    }
    constructor(listService: RtList, bufferedPager: BufferedPager, differs: KeyValueDiffers) {
        super(listService, bufferedPager, differs, 'takeRowCountInternal');
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
