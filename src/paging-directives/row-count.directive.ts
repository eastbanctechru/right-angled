import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffers, OnInit } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { PagerInputBase } from './pager-input-base';

@Directive({
    /* tslint:disable-next-line:directive-selector */
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
    constructor(bufferedPager: BufferedPager, differs: KeyValueDiffers) {
        super(bufferedPager, differs, 'takeRowCountInternal');
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
