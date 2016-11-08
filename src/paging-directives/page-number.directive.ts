import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtList } from '../core/list';

@Directive({
    /* tslint:disable-next-line:directive-selector-name directive-selector-type directive-selector-prefix */
    selector: 'input[rtPageNumber]'
})
export class PageNumberDirective implements DoCheck {
    private pagerDiffer: KeyValueDiffer;

    @HostBinding('value')
    public innerPageNumber: number;

    constructor( private listService: RtList, private pager: PagedPager, differs: KeyValueDiffers) {
        this.innerPageNumber = pager.pageNumber;
        this.pagerDiffer = differs.find([]).create(null);
    }

    @HostListener('keyup.enter')
    public onEnter(): void {
        this.innerPageNumber = this.pager.pageNumber;
        this.listService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        this.innerPageNumber = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pager.pageNumber = value;
        setTimeout(() => this.innerPageNumber = this.pager.pageNumber);
    }

    @HostListener('blur')
    public restoreInputValue(): void {
        this.innerPageNumber = this.pager.pageNumber;
    }

    private checkPageNumberChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal') {
            this.innerPageNumber = item.currentValue;
        }
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageNumberChanged);
        }
    }
}
