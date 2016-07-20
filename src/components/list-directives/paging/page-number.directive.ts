import { HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';

import { RtListService } from '../../services/rt-list-service.service';
import { RtNullObjectInjectableObject, RtPagedPager } from '../../services/injectables';

@Directive({
    selector: 'input[rtPageNumber]'
})
export class PageNumberDirective implements DoCheck {
    private pagerDiffer: KeyValueDiffer;

    @HostBinding('value')
    public innerPageNumber: number;

    constructor( private listService: RtListService, private pager: RtPagedPager, differs: KeyValueDiffers) {
        if (pager === RtNullObjectInjectableObject.instance) {
            throw new Error('[rtPageNumber] directive can be used only with paged lists.');
        }
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
    public restoreInputValue(value: any): void {
        this.innerPageNumber = this.pager.pageNumber;
    }

    private checkPageNumberChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal' && item.currentValue !== this.innerPageNumber) {
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
