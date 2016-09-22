import { Directive, HostBinding, HostListener, KeyValueDiffers } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RtListService } from '../list-service';
import { PageSizeControlBase } from './page-size-control-base';

@Directive({
    selector: 'input[rtRowCount]'
})
export class RowCountDirective extends PageSizeControlBase {
    @HostBinding('value')
    public innerValue: number;
    public get pageSizePropertyName(): string {
        return 'takeRowCountInternal';
    }
    constructor(listService: RtListService, pager: BufferedPager, differs: KeyValueDiffers) {
        super(listService, pager, differs);
        if (pager === null) {
            throw new Error('[rtRowCount] directive can be used only with buffered list provider.');
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
