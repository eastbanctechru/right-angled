import { HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { RtListComponent } from '../../lists/list';
import { NgPagedListService } from '../../bootstrap/ngPagedListService';

@Directive({
    selector: 'input[rt-page-number]'
})
export class RtPageNumberDirective implements DoCheck {
    private pagedListService: NgPagedListService;
    private pagerDiffer: KeyValueDiffer;

    @HostBinding('value')
    public innerPageNumber: number;

    constructor(listHost: RtListComponent, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-page-number] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
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
