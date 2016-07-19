import { HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';

import { ListComponent } from '../list.component';
import { RtPagedListService } from '../../services/ng-paged-list-service.service';

@Directive({
    selector: 'input[rtPageNumber]'
})
export class PageNumberDirective implements DoCheck {
    private pagedListService: RtPagedListService;
    private pagerDiffer: KeyValueDiffer;

    @HostBinding('value')
    public innerPageNumber: number;

    constructor(listHost: ListComponent, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rtPageNumber] directive can be used only with paged list services.');
        }
        this.pagedListService = <RtPagedListService>listHost.serviceInstance;
        this.innerPageNumber = this.pagedListService.pager.pageNumber;
        this.pagerDiffer = differs.find([]).create(null);
    }

    @HostListener('keyup.enter')
    public onEnter(): void {
        this.innerPageNumber = this.pagedListService.pager.pageNumber;
        this.pagedListService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        this.innerPageNumber = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pagedListService.pager.pageNumber = value;
        setTimeout(() => this.innerPageNumber = this.pagedListService.pager.pageNumber);
    }

    @HostListener('blur')
    public restoreInputValue(value: any): void {
        this.innerPageNumber = this.pagedListService.pager.pageNumber;
    }

    private checkPageNumberChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal' && item.currentValue !== this.innerPageNumber) {
            this.innerPageNumber = item.currentValue;
        }
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageNumberChanged);
        }
    }
}
